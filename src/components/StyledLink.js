import Link from "next/link";

const StyledLink = ({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      className="bg-secondColor border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default StyledLink;