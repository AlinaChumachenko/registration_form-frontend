import Link from "next/link";
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';
import Image from "next/image";

const Header = () => {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    logout(); 
    router.push('/login'); 
  };

  const handleWarningLogOut = () => {
    const confirmed = window.confirm("Are you sure you want to log out of your account?");
    if (confirmed) {
      handleLogout();
    }
  };

  return (
    <header className="w-full bg-secondBody drop-shadow-md rounded-3xl">
      <div className="flex h-[75px] rounded-lg items-center justify-end p-5">
        <ul className="flex gap-x-10 items-center">
          {user ? (
            <>
              <div className="flex items-center gap-x-4">
                <Image
                priority
                  src={user.avatar} 
                  alt={`${user.name}'s avatar`}
                  className="w-10 h-10 rounded-full"
                  width={300}
                  height={300}
                />
                <Link className='text-textColor text-2xl font-semibold leading-22' href="/profile">
                  Hello, {user.name}
                </Link>
              </div>
              <button
                type="button"
                className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={handleWarningLogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <Link className='text-textColor text-2xl font-semibold leading-22' href="/login">
              Log In
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;