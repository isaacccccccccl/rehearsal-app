import React from 'react';

export function LiveLyrics({ lyrics, user, highContrast, fontSize }) {
  function isHebrew(text) {
    return /[\u0590-\u05FF]/.test(text);
  }

  function renderNewFormatLyrics(line, index) {
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', minHeight: '1.2em' }}>
            {line.map((word, i) => (
              <span key={i} style={{ minWidth: '2em', textAlign: 'center', color: highContrast ? '#ffd700' : '#1DB954', fontWeight: 600 }}>
                {word.chords || ''}
              </span>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1em', minHeight: '1.2em' }}>
          {line.map((word, i) => (
            <span key={i} style={{ minWidth: '2em', textAlign: 'center' }}>{word.lyrics}</span>
          ))}
        </div>
      </div>
    );
  }

  
  if (!lyrics) return null;
  const isArrayOfArrays = Array.isArray(lyrics[0]);
  return (
    <>
      {isArrayOfArrays
        ? lyrics.map(renderNewFormatLyrics)
        : lyrics.map(renderOldFormatLyrics)}
    </>
  );
} 