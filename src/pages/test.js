import React, { useState, useEffect } from 'react';
import Header from "@@/components/Header";
import Footer from "@@/components/Footer";
import TestBudget from "@@/components/TestBudget";
import TestExpense from "@@/components/TestExpense";
import TestBalance from '@@/components/TestBalanse';


export default function Test() {
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
    };

    const handleExpensesUpdate = (newTotalExpenses) => {
        setTotalExpenses(newTotalExpenses);
    };

    return (
        <div className='flex min-h-screen flex-col p-10 gap-y-4'>
            <Header />
            <TestBalance balance={balance} />
            <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>
            <TestBudget onBudgetUpdate={handleBudgetUpdate} />
            <TestExpense onExpensesUpdate={handleExpensesUpdate} />
            
            <Footer />
        </div>
    );
}