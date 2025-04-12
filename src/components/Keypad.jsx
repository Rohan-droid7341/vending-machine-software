// src/components/Keypad.js
import React from 'react';

const Keypad = ({ onKeyPress, onClear, onEnter }) => {
  const keys = ['A', 'B', 'C', '1', '2', '3']; // Simplified keys

  return (
    <div className="keypad">
      {keys.map((key) => (
        <button key={key} onClick={() => onKeyPress(key)}>
          {key}
        </button>
      ))}
      <button className="clear" onClick={onClear}>Clear</button>
      {/* Add filler buttons or adjust grid if needed for layout */}
      <button></button> {/* Placeholder */}
      <button className="enter" onClick={onEnter}>Enter</button>
    </div>
  );
};

export default Keypad;