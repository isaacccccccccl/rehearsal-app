import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { songService } from '../services/song.service';
import { socketService, SOCKET_EVENT_REHEARSAL_ENDED } from '../services/socket.service';

export function LivePage() {
  const { songId } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [fontSize, setFontSize] = useState(24);
  const [highContrast, setHighContrast] = useState(false);
  const user = useSelector(state => state.userModule?.user);
  // sessionId is admin's userId for now
  const sessionId = user?._id;
  const lyricsContainerRef = useRef(null);
  console.log('user', user)

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await songService.getById(songId);
        setSong(data);
      } catch (error) {
        console.error('Error fetching song:', error);
      }
    };
    fetchSong();
  }, [songId]);

  useEffect(() => {
    function onRehearsalEnded() {
      navigate('/');
    }
    socketService.on(SOCKET_EVENT_REHEARSAL_ENDED, onRehearsalEnded);
    return () => socketService.off(SOCKET_EVENT_REHEARSAL_ENDED, onRehearsalEnded);
  }, [navigate]);

  // Auto-scroll effect
  useEffect(() => {
    if (!song) return;
    const container = lyricsContainerRef.current;
    if (!container) {
      console.log('No container found for lyrics');
      return;
    }
    // Log container and its computed styles
    console.log('Container:', container);
    const computed = window.getComputedStyle(container);
    console.log('Computed height:', computed.height, 'overflowY:', computed.overflowY);
    let scrollInterval;
    if (autoScroll) {
      console.log('Auto-scroll enabled');
      scrollInterval = setInterval(() => {
        console.log('scrollTop:', container.scrollTop, 'clientHeight:', container.clientHeight, 'scrollHeight:', container.scrollHeight);
        if (container.scrollTop + container.clientHeight < container.scrollHeight) {
          container.scrollTop += 1;
        }
      }, 50);
    } else {
      console.log('Auto-scroll paused, resetting to top');
      container.scrollTop = 0;
    }
    return () => clearInterval(scrollInterval);
  }, [autoScroll, song]);

  const isHebrew = (text) => /[\u0590-\u05FF]/.test(text);

  const renderNewFormatLyrics = (line, index) => {
    const isHebrewLine = line.some(word => isHebrew(word.lyrics));
    const showChords = user?.instrument?.toLowerCase() !== 'vocals';
    const lineStyle = {
      fontSize: `${fontSize}px`,
      textAlign: isHebrewLine ? 'right' : 'left',
      direction: isHebrewLine ? 'rtl' : 'ltr',
      color: highContrast ? '#ffffff' : '#e0e0e0',
      backgroundColor: highContrast ? '#000000' : 'transparent',
      padding: '8px',
      margin: '12px 0',
      borderRadius: '4px',
    };

    return (
      <div key={index} style={lineStyle}>
        {showChords && (
          <div style={{ display: 'flex', gap: '2em', minHeight: '1.2em' }}>
            {line.map((word, i) => (
              <span key={i} style={{ minWidth: '2.5em', textAlign: 'center', color: highContrast ? '#ffd700' : '#1DB954', fontWeight: 600 }}>
                {word.chords || ''}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: '2em', minHeight: '1.2em' }}>
          {line.map((word, i) => (
            <span key={i} style={{ minWidth: '2.5em', textAlign: 'center' }}>{word.lyrics}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderOldFormatLyrics = (line, index) => {
    const isHebrewLine = isHebrew(line.lyrics);
    const showChords = user?.instrument?.toLowerCase() !== 'vocals';
    const lineStyle = {
      fontSize: `${fontSize}px`,
      textAlign: isHebrewLine ? 'right' : 'left',
      direction: isHebrewLine ? 'rtl' : 'ltr',
      color: highContrast ? '#ffffff' : '#e0e0e0',
      backgroundColor: highContrast ? '#000000' : 'transparent',
      padding: '8px',
      margin: '4px 0',
      borderRadius: '4px'
    };

    return (
      <div key={index} style={lineStyle}>
        {showChords && line.chords && (
          <span className="chords" style={{ color: highContrast ? '#ffd700' : '#1DB954' }}>
            {line.chords}
          </span>
        )}
        <span className="lyrics">{line.lyrics}</span>
      </div>
    );
  };

  const renderLyrics = () => {
    if (!song?.lyrics) return null;
    const isArrayOfArrays = Array.isArray(song.lyrics[0]);
    return isArrayOfArrays 
      ? song.lyrics.map(renderNewFormatLyrics)
      : song.lyrics.map(renderOldFormatLyrics);
  };

  function handleQuit() {
    socketService.endRehearsal(sessionId);
    navigate('/');
  }

  if (!song) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`live-page ${highContrast ? 'high-contrast' : ''}`}>
      <div className="controls">
        <button onClick={() => setAutoScroll(!autoScroll)}>
          {autoScroll ? 'Pause Scroll' : 'Auto Scroll'}
        </button>
        {user?.isAdmin && (
          <button onClick={handleQuit} className="quit-button">
            Quit
          </button>
        )}
      </div>

      <div className="song-info">
        <h1>{song.title}</h1>
        <h2>{song.artist}</h2>
      </div>

      <div className="lyrics-container" ref={lyricsContainerRef}>
        {renderLyrics()}
      </div>
    </div>
  );
} 