const SetButgetBtn = () => {

    return (
        <button 
        type="submit" 
        className="bg-secondColor w-44 border text-textColor text-xl font-semibold p-2 rounded-lg transition-transform transform hover:scale-105">
        SET BUDGET
        </button>
    )
};

export default SetButgetBtn;




// import { useState } from "react";

// const SetBudget = () => {
//     const [budget, setBudget] = useState(0);

//     const handleBudgetChange = (e) => {
//         setBudget(e.target.value);
//       };

//     return (
//       <div className='flex min-h-screen flex-col p-10'>
//         <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>

//         <div className="mb-6">
//         <h2 className="text-xl font-semibold">Set Budget</h2>
//         <input
//           type="number"
//           value={budget}
//           onChange={handleBudgetChange}
//           placeholder="Enter total budget"
//           className="p-2 border rounded-lg w-full"
//         />
//       </div>
//       </div>
//     );
//   };

//   export default SetBudget;