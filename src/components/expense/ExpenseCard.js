import React from "react";
import UpdateCardBtn from "./UpdateCardBtn";
import DeleteCardBtn from "./DeleteCardBtn";

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3>{expense.name}</h3>
      <p>Amount: ${expense.amount}</p>
      <p>Date: {expense.date}</p>
      <div className="flex space-x-2">

        <UpdateCardBtn onClick={onEdit} />
        <DeleteCardBtn onClick={onDelete} />
        
      </div>
    </div>
  );
};

export default ExpenseCard;