import Image from "next/image";
import IconClose from "../../../public/images/closex.svg";
import AddExpenseForm from "./AddExpenseForm";

const AddExpenseModal = ({ isOpenModal, closeModal, addExpense }) => {
  return (
    <>
      {isOpenModal && (
        <div className="flex items-center justify-center">
          <div className="flex gap-y-4 flex-col items-center justify-center p-6 rounded-lg shadow-lg ">
            <div className="flex w-full justify-between">
              <h1 className="text-textColor text-2xl font-semibold leading-22">Add Expense</h1>
              <button
                type="button"
                onClick={closeModal}
                className=""
              >
                <Image priority src={IconClose} alt="Close" />
              </button>
            </div>

            <AddExpenseForm onSubmit={addExpense} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default AddExpenseModal;