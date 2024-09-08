import React, { useState } from "react";
import AddBudgetModal from "./AddBudgetModal";


const AddBudget = () => {
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
    closeModal();
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleOpenModal}
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
      >
        SET BUDGET
      </button>

      <AddBudgetModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        setBudget={handleSetBudget}
      />

      <div className="mt-6">
      <div className="mb-4 text-lg font-semibold">
        Budget: ${budget !== null ? budget : 'Not set'}
      </div>
      </div>
    </div>
  );
};

export default AddBudget;