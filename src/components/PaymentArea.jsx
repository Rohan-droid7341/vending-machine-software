// src/components/PaymentArea.js
import React from 'react';

const PaymentArea = ({ onInsertMoney }) => {
  return (
    <div className="payment-area">
      <h4>Insert Money</h4>
      <div className="coin-slot"></div>
      <div className="card-slot"></div> {/* Placeholder visual */}
      <div className="payment-buttons">
         {/* Simulate inserting different amounts */}
        <button onClick={() => onInsertMoney(0.25)}>25¢</button>
        <button onClick={() => onInsertMoney(1.00)}>$1</button>
        <button onClick={() => onInsertMoney(5.00)}>$5</button>
        {/* <button onClick={() => onInsertMoney('card')}>Card</button> */} {/* Card simulation TBD */}
      </div>
    </div>
  );
};

export default PaymentArea;