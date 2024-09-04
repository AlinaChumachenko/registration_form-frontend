import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { name, email, password });
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');

      router.push('/login');
      
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-y-8 py-2">
      <h1 className="text-textColor text-2xl font-semibold leading-22">Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 min-w-[400px]">
        <input
          type="text"
          placeholder="Name"
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="p-2 border border-secondColor rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-secondColor rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-secondColor rounded-lg"
          required
        />
        <button type="submit" className="bg-secondColor border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
        >Register</button>
      </form>
      {message && <p>{message}</p>}
      <Link className="text-textColor text-xl" href="/login">
       Already have an account? Log in
      </Link>
    </div>
  );
}