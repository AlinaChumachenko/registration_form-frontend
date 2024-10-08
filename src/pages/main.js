import React, { useState, useEffect } from 'react';
import Balance from '@@/components/Balance';
import AddBudget from '@@/components/budget/AddBudget';
import AddExpense from '@@/components/expense/AddExpense';

export default function Main() {
    const [budget, setBudget] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const savedBudget = localStorage.getItem('budget');
        const savedExpenses = localStorage.getItem('expenses');
        const totalExpenses = savedExpenses ? JSON.parse(savedExpenses).reduce((total, expense) => total + parseFloat(expense.amount), 0) : 0;
        setBudget(savedBudget ? parseFloat(savedBudget) : 0);
        setTotalExpenses(totalExpenses);
    }, []);

    useEffect(() => {
        setBalance(budget - totalExpenses);
    }, [budget, totalExpenses]);


    const handleBudgetUpdate = (newBudget) => {
        setBudget(newBudget);
        localStorage.setItem('budget', newBudget);
    };

    const handleExpensesUpdate = (newTotalExpenses) => {
        setTotalExpenses(newTotalExpenses);
    };

    return (
        <div className='flex min-h-screen flex-col p-10 gap-y-4'>
            <Balance balance={balance} />
            <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>
            <AddBudget onBudgetUpdate={handleBudgetUpdate} />
            <AddExpense onExpensesUpdate={handleExpensesUpdate} />
        </div>
    );
}