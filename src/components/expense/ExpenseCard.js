const ExpenseCard = ({ name, amount, date }) => {
    return (
      <div className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-700">Amount: ${amount}</p>
        <p className="text-gray-500">Date: {date}</p>
      </div>
    );
  };
  
  export default ExpenseCard;