// src/components/DisplayScreen.js
import React from 'react';

const DisplayScreen = ({ messageLine1 = '', messageLine2 = '' }) => {
  return (
    <div className="display-screen fade-in" key={messageLine1 + messageLine2}>
      <div className="display-line-1">{messageLine1}</div>
      <div className="display-line-2">{messageLine2}</div>
    </div>
  );
};

export default DisplayScreen;