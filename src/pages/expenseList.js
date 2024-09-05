// import SetBudget from "@@/components/setBudget";

// import AddExpenseBtn from "@@/components/AddExpenseBtn";
import AddExpenseModal from "@@/components/AddExpenseModal";
import SetButgetBtn from "@@/components/SetBudgetBtn";


export default function ExpenseList() {
    
    return (
    <div className='flex min-h-screen flex-col p-10'>
    <h1 className="text-textColor text-2xl font-semibold mx-auto leading-22">Family Budget Tracker</h1>
    <SetButgetBtn />
    {/* <AddExpenseBtn /> */}
    {/* <SetBudget /> */}
    <AddExpenseModal />
    </div>
    )
  }