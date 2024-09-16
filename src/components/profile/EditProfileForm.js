import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../context/UserContext';

const EditProfileForm = ({ onClose, onProfileUpdate }) => {
  const { setUser } = useUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (avatar) formData.append('avatar', avatar);
      if (password) formData.append('password', password);

      const response = await axios.put(`${process.env.NEXT_PUBLIC_PATH}/api/user/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setUser(response.data.user);
      onProfileUpdate(response.data.user);
      alert('Profile updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
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
      <label>
        Avatar:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="border rounded p-2"
        />
      </label>
      <label>
        New password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2"
        />
      </label>
      <button
        type="submit"
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
};

export default EditProfileForm;