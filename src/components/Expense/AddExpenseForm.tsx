import React, { useState } from "react";
import { AppContext, useAppContext } from "../../context/AppContext";
import { Expense } from "../../types/types";

const AddExpenseForm = () => {
  const { expenses, setExpenses } = useAppContext();
  const [name, setName] = useState("");
  const [cost, setCost] = useState<number>(0);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(4);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newExpense: Expense = {
      id: generateId(),
      name: name,
      cost: cost,
    };

    setExpenses((prev) => [...prev, newExpense]);

    setName("");
    setCost(0);
  };

  const handleCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value === "") {
      setCost(0);
    } else {
      const parsedValue = parseInt(value);
      
      if (!isNaN(parsedValue)) {
        setCost(parsedValue);
      }
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="row">
        <div className="col-sm">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-sm">
          <label htmlFor="cost">Cost</label>
          <input
            required
            type="number"
            className="form-control"
            id="cost"
            value={cost.toString()}
            onChange={handleCostChange}
          />
        </div>
        <div className="col-sm">
          <button type="submit" className="btn btn-primary mt-3">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;