// import React from 'react';

// const Balanse = ({ budget = 0, expenses = [] }) => {

//   const totalExpenses = expenses.reduce((total, expense) => {
//     
//     const amount = parseFloat(expense.amount);
//     return !isNaN(amount) ? total + amount : total;
//   }, 0).toFixed(2);
  

//   const balance = (budget ? budget - totalExpenses : 0).toFixed(2);

//   return (
//     <div className="mb-4 text-lg font-semibold">
//       <div className="font-bold text-xl">
//         Balance: ${balance}
//       </div>
//     </div>
//   );
// };

// export default Balanse;