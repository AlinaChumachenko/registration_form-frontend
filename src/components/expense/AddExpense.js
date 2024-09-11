import React, { useState, useEffect } from "react";
import ExpenseCard from "./ExpenseCard";
import AddExpenseModal from "./AddExpenseModal";
import AddExpenseBtn from "./AddExpenseBtn";

const AddExpense = ({ onExpensesUpdate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [expenses, setExpenses] = useState([]);

  
  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
      const totalExpenses = expenses.reduce(
        (total, expense) =>
          total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
        0
      );
      onExpensesUpdate(totalExpenses);
    }
  }, [expenses, onExpensesUpdate]);

  
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    setIsOpenModal(false);  
  };

  
  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const totalExpenses = expenses.reduce(
    (total, expense) =>
      total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
    0
  );

  return (
    <div>
      <div className="mb-4 text-lg font-semibold">
        Total Expenses: ${totalExpenses.toFixed(2)}
      </div>

      <AddExpenseBtn onClick={() => setIsOpenModal(true)} />

      <AddExpenseModal
        isOpenModal={isOpenModal}
        closeModal={() => setIsOpenModal(false)}
        handleSubmit={handleAddExpense} 
      />

      <div className="mt-6">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseCard
              key={index}
              expense={expense}
              onDelete={() => handleDelete(index)}
            />
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddExpense;