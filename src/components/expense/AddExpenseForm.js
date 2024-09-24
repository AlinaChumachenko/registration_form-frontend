import React, { useState, useEffect } from "react";
import Button from "../Button";

const AddExpenseForm = ({ onSubmit, closeModal, editExpense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');



  useEffect(() => {
    if (editExpense) {
      setExpenseName(editExpense.name);
      setAmount(editExpense.amount);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!expenseName.trim() || !amount || !date) {
      setError('Please fill out all fields.');
      return;
    }

    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    setError('');
    onSubmit({ name: expenseName, amount, date });
    setExpenseName('');
    setAmount('');
    setDate('');
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-[400px]">
      <input
        type="text"
        placeholder="Expense Name"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        className="p-2 border border-secondColor rounded-lg"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="p-2 border border-secondColor rounded-lg"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="p-2 border border-secondColor rounded-lg"
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-center space-x-2">
        <Button isSubmit text={editExpense ? "UPDATE" : "CREATE"} />
      </div>
    </form>
  );
};

export default AddExpenseForm;