const { getIncomes, addIncome, updateIncome, deleteIncome } = require('../controllers/income.js');
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expense.js');

const router = require('express').Router();

router
.get('/get-incomes', getIncomes)
.post('/add-income', addIncome)
.put('/update-income/:id', updateIncome)
.delete('/delete-income/:id', deleteIncome)
.get('/get-expenses', getExpenses)
.post('/add-expense', addExpense)
.put('/update-expense/:id', updateExpense)
.delete('/delete-expense/:id', deleteExpense);

module.exports = router;