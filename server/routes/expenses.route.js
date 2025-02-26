const controller = require('../controllers/expenses.controller');
const express = require('express');
const expenseRouter = express.Router();

// Add a new expense
expenseRouter.post('/add', controller.addExpense);

// Get all expenses
expenseRouter.get('/', controller.getExpenses);

// Delete an expense by ID
expenseRouter.delete('/:id', controller.deleteExpense);

// Get total income and expenses summary
expenseRouter.get('/summary', controller.getExpenseSummary);

module.exports = expenseRouter;
