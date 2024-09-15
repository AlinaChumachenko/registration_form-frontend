import { useUser } from '../context/UserContext';
import Image from 'next/image';
export default function Profile() {
    const { user } = useUser();

    return (
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
             </div>
           ) : (
               <p>Loading user data...</p> // Можно заменить на любой текст или спиннер
           )}
        </div>
    );
}