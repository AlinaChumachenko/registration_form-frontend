import React from "react";

const AddExpenseBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
    >
      ADD EXPENSE
    </button>
  );
};

export default AddExpenseBtn;


