import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useUser } from '../../context/UserContext';
import Button from '../Button';

const EditProfileForm = ({ onClose, onProfileUpdate }) => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_PATH}/api/user/update`, {
        email: user.email,
        name,
        newEmail: email,
       
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      
      setUser(response.data.user);
      onProfileUpdate(response.data.user);

      toast('Profile updated successfully!');

      onClose();
    } catch (error) {

      console.error('Error updating profile:', error);
      toast('Error updating profile');
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded p-2"
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2"
        />
      </label>
      <Button isSubmit disabled={loading} text={loading ? 'Updating...' : 'Update'} />
    </form>
  );
};

export default EditProfileForm;