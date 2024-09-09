import Link from "next/link";
const Header = () => {
    return (
    <header className="w-full bg-secondBody drop-shadow-md rounded-3xl">
      <div className="flex h-[75px] rounded-lg items-center justify-end p-5">
        <ul className="flex gap-x-10 justify-between">

        <Link className='text-textColor text-2xl font-semibold leading-22'href="/">Home</Link>
        
        <Link className='text-textColor text-2xl font-semibold leading-22'href="/login">Log Out</Link>
        
        </ul>
      </div>
    </header>
    )
  };

  export default Header;