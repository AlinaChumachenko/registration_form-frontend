import Link from "next/link";
import { useUser } from '../context/UserContext';
import { useRouter } from "next/router";
import Image from "next/image";
import StyledLink from "./StyledLink";

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
      <nav className="flex h-[75px] rounded-lg items-center justify-end p-5">
        <ul className="flex space-x-4">
          {router.pathname === "/profile" && (
            <>
              <StyledLink href="/main">Back to Main</StyledLink>
              <StyledLink href="/" onClick={handleWarningLogOut}>Log Out</StyledLink>
            </>
          )}
          {router.pathname === "/main" && user ? (
            <>
              <div className="flex items-center gap-x-4">
                <Image
                  priority
                  src={user.avatar} 
                  alt={`${user.name}'s avatar`}
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <StyledLink href="/profile">{user.name}</StyledLink>
               </div>
              <button
                type="button"
                className="bg-secondColor border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
                onClick={handleWarningLogOut}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {router.pathname === "/" && (
                <>
                 <StyledLink href="/register">Register</StyledLink>
                 <StyledLink href="/login">Log In</StyledLink> 
                </>
              )}
              {router.pathname === "/login" && (
                <StyledLink href="/">Back to Home</StyledLink>
                )}
              {router.pathname === "/register" && (
                <StyledLink href="/">Back to Home</StyledLink>
              )}
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;