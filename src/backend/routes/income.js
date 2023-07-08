const { getIncomes, addIncome, deleteIncome } = require('../controllers/income.js');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expense.js');


const router = require('express').Router();

router
.get('/get-incomes', getIncomes)
.post('/add-income', addIncome)
.delete('/delete-income/:id', deleteIncome)
.get('/get-expenses', getExpenses)
.post('/add-expense', addExpense)
.delete('/delete-expense/:id', deleteExpense);

module.exports = router;