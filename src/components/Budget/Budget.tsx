import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";



const Budget = () => {
  const {budget , setBudget} = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetEdit = () => {
    setIsEditing(true);
  };

  const handleSaveBudget = () => {
    setBudget(newBudget);
    setIsEditing(false);
  };

  return (
    <div className="alert alert-secondary p-3 d-flex align-items-center justify-content-between">
    {isEditing ? (
      <>
        <input
          type="number"
          value={newBudget}
          onChange={(e) => setNewBudget(parseInt(e.target.value))}
          placeholder="Enter New Budget"
        />
        <button onClick={handleSaveBudget} >
          Save
        </button>
      </>
    ) : (
      <>
        <div>Budget: ${budget}</div>
        <button onClick={handleBudgetEdit} >
          Edit
        </button>
      </>
    )}
  </div>
  );
};

export default Budget;
