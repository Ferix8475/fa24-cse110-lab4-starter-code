import { Database } from "sqlite";
import { Expense } from "../types";
import { Request, Response } from "express";

export async function createExpenseServer(req: Request, res: Response, db: Database) {

    try {
        // Type casting the request body to the expected format.
        const { id, cost, description } = req.body as { id: string, cost: number, description: string };
 
        if (!description || !id || !cost) {
            return res.status(400).send({ error: "Missing required fields" });
        }
 
        await db.run('INSERT INTO expenses (id, description, cost) VALUES (?, ?, ?);', [id, description, cost]);
        res.status(201).send({ id, description, cost });
 
    } catch (error) {
 
        return res.status(400).send({ error: `Expense could not be created, + ${error}` });
    };
 
 }
 

 export async function deleteExpense(req: Request, res: Response, db: Database) {
    try {
        // Destructuring the `id` from the request body
        const { id } = req.params as { id: string };
 
        if (!id) {
            return res.status(400).send({ error: "Missing required 'id' field" });
        }

        // Check if the expense exists
        const row = await db.get('SELECT 1 FROM expenses WHERE id = ? LIMIT 1;', id);
        if (!row) {
            return res.status(404).send({ error: "Expense not found" });
        }
 
        // Delete the expense if it exists
        await db.run('DELETE FROM expenses WHERE id = ?;', id);
        res.status(200).send({ message: "Expense deleted successfully" });
 
    } catch (error) {
        console.error("Error deleting expense:", error);  // Logs error to server console for debugging
        return res.status(500).send({ error: "Expense could not be deleted" });
    }
 }


export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM expenses');
        res.status(200).send({ expenses });
    } catch (error) {
        res.status(400).send({ error: `Expenses can't be fetched: ${error}` });
    }
}