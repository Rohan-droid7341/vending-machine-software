// src/components/ItemGrid.js
import React from 'react';

const Item = ({ item, isSelected }) => (
  <div className={`item-slot ${isSelected ? 'selected' : ''}`}>
    <img src={item.imageUrl || '/images/placeholder.png'} alt={item.name} onError={(e) => e.target.src='/images/placeholder.png'} />
    <div className="item-info">
      <span className="item-id">{item.id}</span>
      <span className="item-price">${item.price.toFixed(2)}</span>
      <div className={`item-stock ${item.stock === 0 ? 'sold-out' : ''}`}>
        {item.stock > 0 ? `Stock: ${item.stock}` : 'SOLD OUT'}
      </div>
    </div>
  </div>
);


const ItemGrid = ({ items, selectedCode }) => {
  return (
    <div className="item-grid-container">
      {items.map(item => (
        <Item key={item.id} item={item} isSelected={item.id === selectedCode} />
      ))}
       {/* Add empty slots if needed to fill grid */}
       {Array.from({ length: Math.max(0, 9 - items.length) }).map((_, index) => (
          <div key={`empty-${index}`} className="item-slot item-empty"></div>
       ))}
    </div>
  );
};

export default ItemGrid;