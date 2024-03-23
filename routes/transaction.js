const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.js');
const router = require('express').Router();

router
  .get('/get-transactions', getTransactions)
  .post('/add-transaction', addTransaction)
  .put('/update-transaction/:id', updateTransaction)
  .delete('/delete-transaction/:id', deleteTransaction);

module.exports = router;