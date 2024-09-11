import React, { useState, useEffect } from "react";

const AddExpenseForm = ({ onSubmit, closeModal, editExpense }) => {
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (editExpense) {
      setExpenseName(editExpense.name);
      setAmount(editExpense.amount);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="flex justify-center space-x-2">
        <button
          type="submit"
          className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
        >
          {editExpense ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;