import React from 'react';

export function SongInfo({ title, artist }) {
  return (
    <div className="song-info">
      <h1>{title}</h1>
      <h2>{artist}</h2>
    </div>
  );
} 