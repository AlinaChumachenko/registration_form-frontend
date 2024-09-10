import React, { useState, useEffect } from "react";
import AddBudgetModal from "./AddBudgetModal";
import SetBudgetBtn from "./SetBudgetBtn";

const AddBudget = ({ onBudgetChange }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const savedBudget = localStorage.getItem('budget');
    if(savedBudget) {
      try {
          setBudget(JSON.parse(savedBudget));
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
  

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSetBudget = (amount) => {
    setBudget(amount);
    onBudgetChange(amount); 
    closeModal();
  };

  return (
    <div>
      <SetBudgetBtn onClick={handleOpenModal} />
      <AddBudgetModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        setBudget={handleSetBudget}
      />
      <div className="mb-4 text-lg font-semibold">
        Budget: ${budget !== null ? budget : 'Not set'}
      </div>
    </div>
  );
};

export default AddBudget;
