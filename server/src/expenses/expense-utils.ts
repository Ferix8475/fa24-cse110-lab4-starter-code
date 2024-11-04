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
 

export function deleteExpense(req: Request, res: Response, expenses: Expense[]) {
    const { id } = req.params;

    const index = expenses.findIndex((expense) => expense.id === id);
    if (index === -1) {
        return res.status(404).send({error: "Expense not found" });
    }

    expenses.splice(index, 1);
    res.status(200).send({ message: "Expense deleted successfully" });
}

export async function getExpenses(req: Request, res: Response, db: Database) {
    try {
        const expenses = await db.all('SELECT * FROM expenses');
        res.status(200).send({ expenses });
    } catch (error) {
        res.status(400).send({ error: `Expenses can't be fetched: ${error}` });
    }
}