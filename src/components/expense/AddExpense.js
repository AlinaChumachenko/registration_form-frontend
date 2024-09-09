import React, { useState } from "react";
import AddExpenseModal from "./AddExpenseModal";
import ExpenseCard from "./ExpenseCard";
import AddExpenseBtn from "./AddExpenseBtn";

const AddExpense = ({ budget, expenses, addExpense, removeExpense }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
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
          Total Expenses: ${expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0).toFixed(2)}
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