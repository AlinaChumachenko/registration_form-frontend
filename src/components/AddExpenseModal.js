import React, { useState, useEffect } from "react";
import Image from "next/image";

import IconClose from "../../public/images/closex.svg";

const AddExpenseModal = () => {

const [isOpenModal, setIsOpenModal] = useState(false);

const [expenses, setExpenses] = useState([]);

const [expenseName, setExpenseName] = useState('');
const [amount, setAmount] = useState('');
const [date, setDate] = useState('');

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
    // setIsOpenModal((prev) => !prev);
    setIsOpenModal(true);
};
const closeModal = () => {
    setIsOpenModal(false);
};

const handleSubmit = (e) => {
    e.preventDefault();
    
    setExpenses([...expenses, { name: expenseName, amount, date }]);
    
    setExpenseName('');
    setAmount('');
    setDate('');
    
    closeModal();
};

return (
<div>
    <button 
        type="button"
        onClick={handleOpenModal}
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105">
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
                    className="">
                    <Image
                        priority
                        src={IconClose}
                        alt="Close"
                    />
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-[400px]">
            
                <input
                    type="text"
                    placeholder="Expense Name"
                    onChange={(e) => setExpenseName(e.target.value)}
                    className="p-2 border border-secondColor rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                    className="p-2 border border-secondColor rounded-lg"
                />
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="p-2 border border-secondColor rounded-lg"
                />
                <div className="flex justify-center space-x-2">                    
                    <button
                        type="submit"
                        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105">
                        CREATE
                    </button>
                </div>
            </form>
        </div>
        </div>
    )
    }

        <div className="mt-6">
            {expenses.length > 0 ? (
                <div className="flex flex-col space-y-4">
                    {expenses.map((expense, index) => (
                        <div key={index} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
                            <h2 className="text-lg font-semibold">{expense.name}</h2>
                            <p className="text-gray-700">Amount: ${expense.amount}</p>
                            <p className="text-gray-500">Date: {expense.date}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No expenses yet.</p>
            )}
        </div>
        
</div>
);      

};

export default AddExpenseModal;
