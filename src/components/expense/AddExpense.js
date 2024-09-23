import React, { useState, useEffect, useMemo } from "react";
import ExpenseCard from "./ExpenseCard";
import AddExpenseModal from "./AddExpenseModal";
import AddExpenseBtn from "./AddExpenseBtn";

const AddExpense = ({ onExpensesUpdate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      // const response = await fetch('/api/expenses');
      const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/expenses`);
      const data = await response.json();
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    const totalExpenses = expenses.reduce(
      (total, expense) =>
        total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
      0
    );
    onExpensesUpdate(totalExpenses);
  }, [expenses, onExpensesUpdate]);

  const handleAddExpense = async (newExpense) => {
    if (editExpense !== null) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editExpense.index ? newExpense : expense
      );
      setExpenses(updatedExpenses);
      setEditExpense(null);
    } else {
      // const response = await fetch('/api/addExpense', {
        const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/addExpense`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense),
      });

      const savedExpense = await response.json();
      setExpenses([...expenses, savedExpense]);
    }
    setIsOpenModal(false);
  };

  const handleEdit = (index) => {
    setEditExpense({ ...expenses[index], index });
    setIsOpenModal(true); 
  };

  const handleDelete = async (index) => {
    const expenseToDelete = expenses[index];
    // const response = await fetch('/api/deleteExpense', {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PATH}/api/deleteExpense`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: expenseToDelete._id }),
    });
  
    if (response.ok) {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    } else {
      const errorData = await response.json();
      console.error('Error deleting expense:', errorData.message);
    }
  };

  const totalExpenses = useMemo(() => {
    return expenses.reduce(
      (total, expense) =>
        total + (isNaN(parseFloat(expense.amount)) ? 0 : parseFloat(expense.amount)),
      0
    );
  }, [expenses]);

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
        editExpense={editExpense}
      />

      <div className="mt-6">
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseCard
              key={index}
              expense={expense}
              onDelete={() => handleDelete(index)}
              onEdit={() => handleEdit(index)}
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