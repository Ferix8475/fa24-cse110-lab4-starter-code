import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// Reusable function to create an expense, and test whether it is populated or not
const createExpense = (name: string, cost: number) => {

  const createExpenseButton = screen.getByText("Add");
  let initialNameCount = screen.queryAllByText(name).length;
  let initialCostCount = screen.queryAllByText(`$${cost}`).length;

  fireEvent.change(screen.getByLabelText("Name"), { target: { value: name } });
  fireEvent.change(screen.getByLabelText("Cost"), { target: { value: cost } });
  fireEvent.click(createExpenseButton);

  let updatedNameCount = screen.getAllByText(name).length;
  let updatedCostCount = screen.getAllByText(`$${cost}`).length;

  expect(updatedNameCount).toBe(initialNameCount + 1);
  expect(updatedCostCount).toBe(initialCostCount + 1);

};

// Reusable function to delete an expense, the first one that matches the name, and test the deletion
const deleteExpense = (name: string) => {

  const targetExpenses = screen.getAllByText(name);
  expect(targetExpenses.length).toBeGreaterThan(0);

  const firstItem = targetExpenses[0].closest("li");
  let length = targetExpenses.length;
  const firstDeleteButton = firstItem?.querySelector("button");
  fireEvent.click(firstDeleteButton!);  

  const newCount = screen.queryAllByText(name).length;

  expect(newCount).toBe(length - 1);

};

// Check headers based on fed values
const checkHeadersValues = (budget: number, spent: number, remaining: number) => {
  expect(screen.getByText(`Budget: $${budget}`)).toBeInTheDocument();
  expect(screen.getByText(`Spent so far: $${spent}`)).toBeInTheDocument();
  expect(screen.getByText(`Remaining: $${remaining}`)).toBeInTheDocument();
};

// Check headers to make sure that budget = remaining + spent
const checkHeadersAddUp = () => {
  const budgetText = screen.getByText(/Budget:/).textContent!;
  const remainingText = screen.getByText(/Remaining:/).textContent!;
  const spentText = screen.getByText(/Spent so far:/).textContent!;

  const budget = parseFloat(budgetText.replace(/[^0-9.-]+/g, ''));
  const remaining = parseFloat(remainingText.replace(/[^0-9.-]+/g, ''));
  const spent = parseFloat(spentText.replace(/[^0-9.-]+/g, ''));

  expect(budget).toBe(remaining + spent);
}

describe('Basic Functionality Tests', () => {

  test('Expense Creation Creates an Expense Row', () => {
    
    render(<App />);

    createExpense("Felix Xie", 100);

  });

  test('Expense Deletion Deletes the correct Expense', () => {
    
    render(<App />);

    createExpense("Felix Xie", 100);
    deleteExpense("Felix Xie");

  });

  test('Expense Deletion Duplicates deletes only one of the correct Expenses', () => {
    
    render(<App />);

    createExpense("Felix Xie", 100);
    createExpense("Felix Xie", 1000);
    createExpense("Felix Xie", 10000);
    createExpense("Felix Xie", 100000);
    createExpense("Felix Xie", 10000);
    createExpense("Felix Xie", 9);

    deleteExpense("Felix Xie");
    deleteExpense("Felix Xie");
    deleteExpense("Felix Xie");
    deleteExpense("Felix Xie");
    deleteExpense("Felix Xie");

  });

  test('Test Negative Expenses', () => {
    
    render(<App />);

    createExpense("John", 11000);
    checkHeadersValues(1000, 11000, -10000);
    checkHeadersAddUp();

    createExpense("Felix Xie", 10000);
    checkHeadersValues(1000, 21000, -20000);
    checkHeadersAddUp();

    deleteExpense("Felix Xie");
    checkHeadersValues(1000, 11000, -10000);
    checkHeadersAddUp();

    deleteExpense("John");
    checkHeadersValues(1000, 0, 1000);
    checkHeadersAddUp();
   

  });

  test('General Sanity Test, Check Headers After Operation', () => {
    render(<App />);

    createExpense("A", 100);
    checkHeadersAddUp();
    
    createExpense("B", 2);
    checkHeadersAddUp();

    createExpense("C", 34);
    checkHeadersAddUp();

    createExpense("D", 24);
    createExpense("D", 523);
    checkHeadersAddUp();

    createExpense("A", 9);
    createExpense("A", 1);
    createExpense("B", 1);
    checkHeadersAddUp();

    createExpense("C", 1);
    createExpense("D", 1);
    createExpense("D", 1);
    createExpense("A", 1);
    checkHeadersAddUp();



    deleteExpense("A");
    deleteExpense("B");
    checkHeadersAddUp();

    deleteExpense("C");
    deleteExpense("D");
    checkHeadersAddUp();

    deleteExpense("A");
    checkHeadersAddUp();


  });
  
  test('Edit Button Changes Reflect on Headers', () => {
    render(<App />);

    createExpense("Johnny", 5000);
    checkHeadersValues(1000, 5000, -4000);

    const editButton = screen.getByText("Edit"); 
    fireEvent.click(editButton);

    fireEvent.change(screen.getByPlaceholderText("Enter New Budget"), { target: { value: 100000} });
    fireEvent.click(screen.getByText("Save"));

    checkHeadersValues(100000, 5000, 95000);
    
    deleteExpense("Johnny");
    checkHeadersValues(100000, 0, 100000);
    
  });
});


