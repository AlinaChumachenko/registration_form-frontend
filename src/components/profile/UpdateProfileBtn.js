import React from "react";

const UpdateProfileBtn = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
    >
      Update Profile
    </button>
  );
};

export default UpdateProfileBtn;