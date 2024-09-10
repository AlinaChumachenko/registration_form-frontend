import React, { useState, useEffect } from "react";
import Image from "next/image";
import IconClose from "../../public/images/closex.svg";

const TestExpense = ({ onExpensesUpdate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [expenseName, setExpenseName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
      const totalExpenses = expenses.reduce((total, expense) => total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)), 0);
      onExpensesUpdate(totalExpenses); // Обновляем общие расходы в родительском компоненте
    }
  }, [expenses, onExpensesUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (expenseName && amount && date) {
      const newExpense = { name: expenseName, amount: parseFloat(amount), date };
      setExpenses([...expenses, newExpense]);

      setExpenseName('');
      setAmount('');
      setDate('');
      closeModal();
    }
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  };

  const totalExpenses = expenses.reduce((total, expense) => 
    total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)), 0);

  return (
    <div>
      <div className="mb-4 text-lg font-semibold">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </div>
      <button
        type="button"
        onClick={handleOpenModal}
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
      >
        ADD EXPENSE
      </button>

      {isOpenModal && (
        <div className="flex items-center justify-center">
          <div className="flex gap-y-4 flex-col items-center justify-center p-6 rounded-lg shadow-lg ">
            <div className="flex w-full justify-between">
              <h1 className="text-textColor text-2xl font-semibold leading-22">Add Expense</h1>
              <button
                type="button"
                onClick={closeModal}
              >
                <Image priority src={IconClose} alt="Close" />
              </button>
            </div>

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
                  CREATE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <div key={index} className="p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <h2 className="text-lg font-semibold">{expense.name}</h2>
              <p className="text-gray-700">Amount: ${parseFloat(expense.amount).toFixed(2)}</p>
              <p className="text-gray-500">Date: {expense.date}</p>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
              >
                DELETE
              </button>
            </div>
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>

    </div>
  );
};

export default TestExpense;