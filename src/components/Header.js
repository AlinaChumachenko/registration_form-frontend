import Link from "next/link";
import { useUser } from '../context/UserContext';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="w-full bg-secondBody drop-shadow-md rounded-3xl">
      <div className="flex h-[75px] rounded-lg items-center justify-end p-5">
        <ul className="flex gap-x-10 items-center">
          {/* Check if user is available */}
          {user ? (
            <>
              <span className='text-textColor text-xl font-semibold leading-22'>
                Hello, {user.name}
              </span>
              <Link className='text-textColor text-2xl font-semibold leading-22' href="/logout">
                Log Out
              </Link>
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