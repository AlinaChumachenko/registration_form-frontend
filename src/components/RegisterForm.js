import { useState } from 'react'; 
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from "next/image";
import { useUser } from '../context/UserContext';
import IconEye from "../../public/svg/eye.svg";
import IconEyeOff from "../../public/svg/eye-off.svg";
import { registerSchema, validateForm } from '@@/utils/validation';


const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm(registerSchema, { name, email, password });
    if (validationError) {
      setMessage(`Validation Error: ${validationError}`);
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_PATH}/api/register`, { name, email, password });
      if (response.data.user) {
        localStorage.setItem('token', response.data.token); // Сохранение токена
        setUser(response.data.user); // Обновление состояния пользователя
      }
      
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setPassword('');

      router.push('/login');
    } catch (error) {
      setMessage('Error: ' + error.response.data.message);
    }
  };

  //  const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const validationError = validateForm(registerSchema, { name, email, password });
  //   if (validationError) {
  //     setMessage(`Validation Error: ${validationError}`);
  //     return;
  //   }

  //   try {
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_PATH}/api/register`, { name, email, password });
  //     setUser(response.data.user);
      
  //     setMessage(response.data.message);
  //     setName('');
  //     setEmail('');
  //     setPassword('');

  //     router.push('/login');
      
  //   } catch (error) {
  //     setMessage('Error: ' + error.response.data.message);
  //   }
  // };

  const handleClickPasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"} 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-secondColor rounded-lg w-full"
            required
          />
          <button
            type="button"
            onClick={handleClickPasswordVisibility}
            className="absolute right-2 top-2 text-sm text-gray-600"
          >
            {passwordVisible ? 
            <Image priority src={IconEye} alt="Eye" /> : 
            <Image priority src={IconEyeOff} alt="Eye" />} 
          </button>
        </div>
        
        <button type="submit" className="bg-secondColor border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105">
          REGISTER
        </button>
      </form>

      {message && <p>{message}</p>}
      <Link className="text-textColor text-xl" href="/login">
       Already have an account? Log in
      </Link>

    </div>
  );
};

export default RegisterForm;