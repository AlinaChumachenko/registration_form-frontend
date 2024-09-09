import React from 'react';

const Balanse = ({ budget = 0, expenses = [] }) => { 
  const totalExpenses = expenses.reduce((total, expense) => 
    total + parseFloat(expense.amount), 0);

  const balance = budget - totalExpenses;

  return (
    <div className="mb-4 text-lg font-semibold">
      <div className="font-bold text-xl">
        Balance: ${balance.toFixed(2)}
      </div>
    </div>
  );
};

export default Balanse;
