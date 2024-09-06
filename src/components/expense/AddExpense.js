import React, { useState, useEffect } from "react";
import AddExpenseModal from "./AddExpenseModal";
import ExpenseCard from "./ExpenseCard";

const AddExpense = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
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
    }
  }, [expenses]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOpenModal}
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
      >
        ADD EXPENSE
      </button>

      <AddExpenseModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        addExpense={addExpense}
      />

      <div className="mt-6">
        {expenses.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                amount={expense.amount}
                date={expense.date}
              />
            ))}
          </div>
        ) : (
          <p>No expenses yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;