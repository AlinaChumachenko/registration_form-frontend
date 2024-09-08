import Image from "next/image";
import IconClose from "../../../public/images/closex.svg";
import { useState } from "react";
// import AddExpenseForm from "./AddExpenseForm";

const AddBudgetModal = ({ isOpenModal, closeModal, setBudget }) => {
    const [amount, setAmount] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setBudget(amount); 
    };
  return (
    <>
      {isOpenModal && (
        <div className="flex items-center justify-center">
          <div className="flex gap-y-4 flex-col items-center justify-center p-6 rounded-lg shadow-lg ">
            <div className="flex w-full justify-between">
              <h1 className="text-textColor text-2xl font-semibold leading-22">Add budget amount</h1>
              
              <button
                type="button"
                onClick={closeModal}
                className=""
              >
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
                    <button
                    type="submit"
                    className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
                    >
                    ADD AMOUNT
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBudgetModal;