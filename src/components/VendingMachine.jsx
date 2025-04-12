// src/components/VendingMachine.js
import React, { useState, useEffect } from 'react';
import ItemGrid from './ItemGrid';
import DisplayScreen from './DisplayScreen';
import Keypad from './Keypad';
import PaymentArea from './PaymentArea';
import Dispenser from './Dispenser';
import initialItems from '../data/items'; // Import initial items
import './VendingMachine.css'; // Import styles

const VendingMachine = () => {
  const [items, setItems] = useState(initialItems); // State for items including stock
  const [selectedCode, setSelectedCode] = useState('');
  const [messageLine1, setMessageLine1] = useState('Welcome!');
  const [messageLine2, setMessageLine2] = useState('Select item code');
  const [insertedAmount, setInsertedAmount] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null); // Item object corresponding to selectedCode
  const [dispensedItem, setDispensedItem] = useState(null); // The item currently in the dispenser

  // Timeout reference for clearing messages
  let messageTimeout = null;

  const clearMessagesAfterDelay = (delay = 3000) => {
      clearTimeout(messageTimeout); // Clear existing timeout if any
      messageTimeout = setTimeout(() => {
          resetToDefaultState();
      }, delay);
  };

  const resetToDefaultState = () => {
      setMessageLine1('Welcome!');
      setMessageLine2('Select item code');
      setSelectedCode('');
      setSelectedItem(null);
      setInsertedAmount(0); // Reset inserted amount only on successful purchase/clear
  }

  useEffect(() => {
      // Clear timeout on component unmount
      return () => clearTimeout(messageTimeout);
  }, []);

  const handleKeyPress = (key) => {
    if (dispensedItem) return; // Don't allow input if item waiting
    if (selectedCode.length < 2) { // Limit code length (e.g., A1, B2)
      const newCode = selectedCode + key;
      setSelectedCode(newCode);
      setMessageLine1(`Code: ${newCode}`);
      setMessageLine2('');
      setSelectedItem(null); // Clear previous selection details if re-entering code
       clearTimeout(messageTimeout); // Stop default message reset
    }
  };

  const handleClear = () => {
    if (dispensedItem) return;
    resetToDefaultState();
     clearTimeout(messageTimeout);
  };

  const handleEnter = () => {
    if (dispensedItem || !selectedCode) return;

    const item = items.find(i => i.id === selectedCode);
    clearTimeout(messageTimeout); // Stop default message reset

    if (item) {
      if (item.stock <= 0) {
        setMessageLine1(`Item ${item.id}: ${item.name}`);
        setMessageLine2('SOLD OUT');
        setSelectedCode(''); // Clear code after checking
        clearMessagesAfterDelay(2000);
      } else {
        setSelectedItem(item);
        setMessageLine1(`${item.name}: $${item.price.toFixed(2)}`);
        setMessageLine2(`Inserted: $${insertedAmount.toFixed(2)}`);
        // Keep selectedCode to indicate selection
      }
    } else {
      setMessageLine1('Invalid Code');
      setMessageLine2('Please try again');
      setSelectedCode('');
      clearMessagesAfterDelay(2000);
    }
  };

  const handleInsertMoney = (amount) => {
    if (dispensedItem) return; // Don't allow payment if item waiting

    const newAmount = insertedAmount + amount;
    setInsertedAmount(newAmount);
    clearTimeout(messageTimeout); // Stop default message reset

    if (selectedItem) {
      setMessageLine1(`${selectedItem.name}: $${selectedItem.price.toFixed(2)}`);
      setMessageLine2(`Inserted: $${newAmount.toFixed(2)}`);
      checkPurchase(selectedItem, newAmount);
    } else {
      setMessageLine1(`Inserted: $${newAmount.toFixed(2)}`);
      setMessageLine2('Select item code');
    }
  };

  const checkPurchase = (item, currentAmount) => {
    if (item && currentAmount >= item.price) {
      // Purchase successful
      const change = currentAmount - item.price;
      setMessageLine1('Thank You!');
      setMessageLine2(change > 0 ? `Change: $${change.toFixed(2)}` : 'Dispensing...');

       // Update stock (find item index and update)
       const itemIndex = items.findIndex(i => i.id === item.id);
       if(itemIndex > -1) {
           const updatedItems = [...items];
           updatedItems[itemIndex] = { ...updatedItems[itemIndex], stock: updatedItems[itemIndex].stock - 1 };
           setItems(updatedItems);
       }

      // Simulate dispensing delay
      setTimeout(() => {
        setDispensedItem(item); // Move item to dispenser
        setMessageLine1('Collect your item');
        setMessageLine2('');
        setSelectedCode('');
        setSelectedItem(null);
        setInsertedAmount(0); // Reset money only after dispensing
      }, 1500); // Dispensing animation/delay time

    } else if (item) {
         // Not enough money yet
         setMessageLine1(`${item.name}: $${item.price.toFixed(2)}`);
         setMessageLine2(`Need $${(item.price - currentAmount).toFixed(2)} more`);
    }
  };

  const handleCollectItem = () => {
    setDispensedItem(null);
    resetToDefaultState(); // Go back to welcome screen
     clearTimeout(messageTimeout);
  };


  return (
    <div className="vending-machine">
      <div className="main-section">
        <ItemGrid items={items} selectedCode={selectedCode} />
        <div className="control-panel">
          <DisplayScreen messageLine1={messageLine1} messageLine2={messageLine2} />
          <Keypad
            onKeyPress={handleKeyPress}
            onClear={handleClear}
            onEnter={handleEnter}
          />
          <PaymentArea onInsertMoney={handleInsertMoney} />
        </div>
      </div>
      <Dispenser dispensedItem={dispensedItem} onCollectItem={handleCollectItem} />
    </div>
  );
};

export default VendingMachine;