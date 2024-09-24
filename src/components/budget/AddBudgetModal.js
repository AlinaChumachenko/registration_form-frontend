import React, { useState } from 'react';
import Image from 'next/image';
import IconClose from '../../../public/images/closex.svg';
import Button from '../Button';

const AddBudgetModal = ({ isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(amount);
    onSubmit(newBudget);
    setAmount('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="flex gap-y-4 flex-col items-center justify-center p-6 rounded-lg shadow-lg">
        <div className="flex w-full justify-between">
          <h1 className="text-textColor text-2xl font-semibold leading-22">Add budget amount</h1>
          <button type="button" onClick={onClose}>
            <Image priority src={IconClose} alt="Close" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-[400px]">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Add budget"
            className="p-2 border border-secondColor rounded-lg"
          />
          <div className="flex justify-center space-x-2">
            <Button onClick={handleSubmit} text="ADD AMOUNT" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBudgetModal;