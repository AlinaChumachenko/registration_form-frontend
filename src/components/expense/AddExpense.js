import React, { useState, useEffect } from "react";
import AddExpenseModal from "./AddExpenseModal";
import ExpenseCard from "./ExpenseCard";
import AddExpenseBtn from "./AddExpenseBtn";

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

  const calculateTotal = () => {
    return expenses.reduce((total, expense) => 
      total + parseFloat(expense.amount), 0).toFixed(2);
  };

  const removeExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div>
      <AddExpenseBtn onClick={handleOpenModal} />

      <AddExpenseModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        addExpense={addExpense}
      />

      <div className="mt-6">
      <div className="mb-4 text-lg font-semibold">
          Total Expenses: ${calculateTotal()}
      </div>

        {expenses.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {expenses.map((expense, index) => (
              <ExpenseCard
                key={index}
                name={expense.name}
                amount={expense.amount}
                date={expense.date}
                onRemove={() => removeExpense(index)} 
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