import { API_BASE_URL } from "../constants/constants";
import { Expense } from "../types/types";

// Function to create an expense in the backend. Method: POST
export const createExpense = async (expense: Expense): Promise<Expense> => {
	const response = await fetch(`${API_BASE_URL}/expenses`, {
    	method: "POST",
    	headers: {
        	"Content-Type": "application/json",
    	},
    	body: JSON.stringify(expense),
	});
	if (!response.ok) {
    	throw new Error("Failed to create expense");
	}
	return response.json();
};

// Function to delete an expense in the backend. Method: DELETE
export const deleteExpense = async (id: string): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorData = await response.json(); // Attempt to get more error details
            throw new Error(`Failed to delete expense: ${response.status} - ${errorData.error}`);
        }
    } catch (error) {
        console.error("Error in deleteExpense:", error);
        throw error; // You can choose to handle this differently based on your UI needs
    }
};

// Function to get all expenses from the backend. Method: GET
export const fetchExpenses = async (): Promise<Expense[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/expenses`);
		if (!response.ok) {
			throw new Error('Failed to fetch expenses');
		}

		// Parse and return the response data
		const jsonResponse = await response.json();
		console.log("data in fetchExpenses", jsonResponse);

		// Return the expenses array directly if it’s in `jsonResponse.expenses`
		return jsonResponse.expenses;
	} catch (error) {
		console.error("Error in fetchExpenses:", error);
		throw error;
	}
};


