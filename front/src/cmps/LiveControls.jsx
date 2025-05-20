import React from 'react';

export function LiveControls({ autoScroll, setAutoScroll, isAdmin, handleQuit }) {
  return (
    <div className="controls">
      <button onClick={() => setAutoScroll(a => !a)}>
        {autoScroll ? 'Pause Scroll' : 'Auto Scroll'}
      </button>
      {isAdmin && (
        <button onClick={handleQuit} className="quit-button">
          Quit
        </button>
      )}
    </div>
  );
} 