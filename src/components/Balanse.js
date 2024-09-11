import React from 'react';

const Balance = ({ balance }) => {
  return (
    <div className="mb-4 text-lg font-semibold">
      Balance: ${balance.toFixed(2)}
    </div>
  );
};

export default Balance;