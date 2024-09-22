import React, { useState } from "react";
import { useUser } from '../context/UserContext';
import Image from 'next/image';
import EditProfileModal from '@@/components/profile/EditProfileModal';
import UpdateProfileBtn from '@@/components/profile/UpdateProfileBtn';
import Link from "next/link";
import Header from "@@/components/Header";


export default function Profile() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { user, setUser } = useUser();

  const handleOpenModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className='flex min-h-screen flex-col p-10 gap-y-4'>
      <Header />
      {/* <div className="w-full bg-secondBody drop-shadow-md rounded-3xl flex h-[75px] items-center justify-end p-5">
      <ul className="flex gap-x-10">

        <Link className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105" href="/main">Back to main</Link>        

      </ul>
      </div> */}

    <div className='mx-auto w-full px-4'>
      {user ? (
        <div className='mx-auto w-full px-4'>
          <div className="flex items-center gap-x-4">
            <Image
              priority
              src={user.avatar}
              alt={`${user.name}'s avatar`}
              className="w-10 h-10 rounded-full"
              width={40}
              height={40}
            />
            <div>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          </div>
          <UpdateProfileBtn onClick={handleOpenModal} />
          <EditProfileModal
            isOpen={isOpenModal}
            onClose={closeModal}
            onProfileUpdate={handleProfileUpdate}
          />
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
    </div>
    
  );
}