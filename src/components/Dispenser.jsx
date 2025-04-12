// src/components/Dispenser.js
import React from 'react';

const Dispenser = ({ dispensedItem, onCollectItem }) => {
  return (
    <div className="dispenser">
      <div className="dispenser-flap">PUSH</div>
      {dispensedItem && (
        <div className="dispensed-item" onClick={onCollectItem}>
          <img src={dispensedItem.imageUrl || '/images/placeholder.png'} alt={dispensedItem.name} onError={(e) => e.target.src='/images/placeholder.png'} />
          Collect {dispensedItem.name}
        </div>
      )}
    </div>
  );
};

export default Dispenser;