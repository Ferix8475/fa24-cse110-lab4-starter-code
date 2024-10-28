import { useAppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";
import { deleteExpense } from "../../utils/expense-utils"

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useAppContext();
  
  const handleDeleteExpense = (currentExpense: Expense) => {
    const id = currentExpense.id;
    try {
        deleteExpense(id);
    
        setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    } catch(error) {
        console.error("Failed to delete expense", error);
    }

  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.description}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
