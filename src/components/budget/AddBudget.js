import React, { useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import SetBudgetBtn from "./SetBudgetBtn";

const AddBudget = ({ onBudgetChange }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [budget, setBudget] = useState(null);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const handleSetBudget = (amount) => {
    setBudget(amount);
    onBudgetChange(amount); // Передаем бюджет родительскому компоненту
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