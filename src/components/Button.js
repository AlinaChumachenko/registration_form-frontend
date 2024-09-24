import React from 'react';

const Button = ({ onClick, text, isSubmit = false  }) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      onClick={onClick}
      className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
    >
      {text}
    </button>
  );
};

export default Button;