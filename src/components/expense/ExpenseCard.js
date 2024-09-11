import React from 'react';
import DeleteCardBtn from './DeleteCardBtn';
import UpdateCardBtn from './UpdateCardBtn';

const ExpenseCard = ({ expense, onDelete, onUpdate }) => {
  return (
    <div className="p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">{expense.name}</h2>
      <p className="text-gray-700">Amount: ${parseFloat(expense.amount).toFixed(2)}</p>
      <p className="text-gray-500">Date: {expense.date}</p>
      <div className="flex justify-between mt-2">
        
        <DeleteCardBtn onClick={onDelete} />
        <UpdateCardBtn onClick={onUpdate} />
        
      </div>
    </div>
  );
};

export default ExpenseCard;