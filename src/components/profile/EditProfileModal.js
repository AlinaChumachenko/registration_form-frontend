import React from "react";
import Image from "next/image";
import IconClose from "../../../public/images/closex.svg";
import EditProfileForm from "./EditProfileForm";

const EditProfileModal = ({ isOpen, onClose, onProfileUpdate }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex w-full justify-between mb-4">
          <h1 className="text-textColor text-2xl font-semibold leading-22">
            Update Profile
          </h1>
          <button type="button" onClick={onClose}>
            <Image priority src={IconClose} alt="Close" width={24} height={24} />
          </button>
        </div>
        <EditProfileForm onProfileUpdate={onProfileUpdate} onClose={onClose} />
      </div>
    </div>
  ) : null;
};

export default EditProfileModal;