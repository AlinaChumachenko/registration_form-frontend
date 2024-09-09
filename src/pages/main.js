import React, { useState, useEffect } from "react";
import AddBudget from "@@/components/budget/AddBudget";
import AddExpense from "@@/components/expense/AddExpense";
import Balanse from "@@/components/Balanse";
import Header from "@@/components/Header";
import Footer from "@@/components/Footer";

export default function Main() {
  const [budget, setBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    if (savedBudget) {
        try {
            setBudget(JSON.parse(savedBudget));
        } catch (error) {
            console.error( error);
        }
    }

    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        try {
            setExpenses(JSON.parse(savedExpenses));
        } catch (error) {
            console.error(error);
        }
    }
}, []);

  
  useEffect(() => {
    if (budget !== null) {
      localStorage.setItem('budget', JSON.stringify(budget));
    }
  }, [budget]);

  
  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleBudgetChange = (newBudget) => {
    setBudget(newBudget);
  };

  const handleAddExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleRemoveExpense = (index) => {
    console.log('Removing expense at index:', index);
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  return (
    <div className='flex min-h-screen flex-col p-10 gap-y-4'>
      <Header />
      <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>
      <AddBudget onBudgetChange={handleBudgetChange} />
      <Balanse budget={budget} expenses={expenses} />
      <AddExpense budget={budget} expenses={expenses} addExpense={handleAddExpense} removeExpense={handleRemoveExpense} />
      <Footer />
    </div>
  );
}
