const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expense.js');

const router = require('express').Router();

router
.get('/get-expenses', getExpenses)
.post('/add-expense', addExpense)
.put('/update-expense/:id', updateExpense)
.delete('/delete-expense/:id', deleteExpense);

module.exports = router;