import { useAppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const ExpenseItem = (currentExpense: Expense) => {
  const { expenses, setExpenses } = useAppContext();
  
  const handleDeleteExpense = (currentExpense: Expense) => {
    
    const id = currentExpense.id;

    setExpenses((prev) => prev.filter((expense) => expense.id !== id));

  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>{currentExpense.name}</div>
      <div>${currentExpense.cost}</div>
      <div>
        <button onClick={() => handleDeleteExpense(currentExpense)}>x</button>
      </div>
    </li>
  );
};

export default ExpenseItem;
