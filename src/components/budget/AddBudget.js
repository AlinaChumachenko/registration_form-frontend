import React, { useState, useEffect } from "react";
import AddBudgetModal from "./AddBudgetModal";
import Button from "../Button";

const AddBudget = ({ onBudgetUpdate }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    if (savedBudget) {
      setBudget(parseFloat(savedBudget));
    }
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSubmit = (newBudget) => {
    setBudget(newBudget);
    localStorage.setItem('budget', newBudget);
    onBudgetUpdate(newBudget);
  };

  return (
    <div>
      <Button onClick={handleOpenModal} text="SET BUDGET" />     

      <AddBudgetModal
        isOpen={isOpenModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />

      <div className="mb-4 text-lg font-semibold">
        Budget: ${budget !== null ? budget.toFixed(2) : 'Not set'}
      </div>
    </div>
  );
};

export default AddBudget;