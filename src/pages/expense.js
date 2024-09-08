// import Balanse from "@@/components/Balanse";
import AddBudget from "@@/components/budget/AddBudget";
import AddExpense from "@@/components/expense/AddExpense";



export default function Expense() {
    
    return (
    <div className='flex min-h-screen flex-col p-10'>
    <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>
    <AddBudget />
    <AddExpense />
    {/* <Balanse /> */}
    </div>
    )
  }