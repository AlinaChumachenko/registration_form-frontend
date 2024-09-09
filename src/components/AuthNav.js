import Link from "next/link";
const AuthNav = () => {
    return (
    <auth className="w-full bg-secondBody drop-shadow-md rounded-3xl">
      <div className="flex h-[75px] rounded-lg items-center justify-end p-5">
        <ul className="flex gap-x-10">

        <Link className='text-textColor text-2xl font-semibold leading-22'href="/register">Register</Link>
        <Link className='text-textColor text-2xl font-semibold leading-22'href="/login">Log In</Link>
        
        </ul>
      </div>
    </auth>
    )
  };

  export default AuthNav;