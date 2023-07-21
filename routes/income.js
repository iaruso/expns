const { getIncomes, addIncome, updateIncome, deleteIncome } = require('../controllers/income.js');

const router = require('express').Router();

router
.get('/get-incomes', getIncomes)
.post('/add-income', addIncome)
.put('/update-income/:id', updateIncome)
.delete('/delete-income/:id', deleteIncome)

module.exports = router;