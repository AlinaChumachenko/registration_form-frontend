import { useUser } from '../context/UserContext';

export default function Profile() {
    const { user } = useUser();
  return (
    <div className='mx-auto w-full px-4'>
       Hello, {user.name}
    </div>
  );
}