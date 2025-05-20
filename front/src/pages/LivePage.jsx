import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { songService } from '../services/song.service';
import { socketService, SOCKET_EVENT_REHEARSAL_ENDED } from '../services/socket.service';
import { LiveLyrics } from '../cmps/LiveLyrics';
import { LiveControls } from '../cmps/LiveControls';
import { SongInfo } from '../cmps/SongInfo';

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
      return;
    }
    const computed = window.getComputedStyle(container);
    let scrollInterval;
    if (autoScroll) {
      scrollInterval = setInterval(() => {
        if (container.scrollTop + container.clientHeight < container.scrollHeight) {
          container.scrollTop += 1;
        }
      }, 50);
    } else {
      container.scrollTop = 0;
    }
    return () => clearInterval(scrollInterval);
  }, [autoScroll, song]);

    
  function handleQuit() {
    socketService.endRehearsal(sessionId);
    navigate('/');
  }

  if (!song) return <div className="loading">Loading...</div>;

  return (
    <div className={`live-page ${highContrast ? 'high-contrast' : ''}`}>
      <LiveControls
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        isAdmin={user?.isAdmin}
        handleQuit={handleQuit}
      />
      <SongInfo title={song.title} artist={song.artist} />
      <div className="lyrics-container" ref={lyricsContainerRef}>
        <LiveLyrics
          lyrics={song.lyrics}
          user={user}
          highContrast={highContrast}
          fontSize={fontSize}
        />
      </div>
    </div>
  );
} 