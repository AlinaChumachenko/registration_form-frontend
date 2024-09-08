import React, { useState } from "react";
import AddBudgetModal from "./AddBudgetModal";
import SetBudgetBtn from "./SetBudgetBtn";


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

      <SetBudgetBtn onClick={handleOpenModal} />

      <AddBudgetModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        setBudget={handleSetBudget}
      />

      {/* <div className="mt-6"> */}
      <div className="mb-4 text-lg font-semibold">
        Budget: ${budget !== null ? budget : 'Not set'}
      </div>
      {/* </div> */}
    </div>
  );
};

export default AddBudget;