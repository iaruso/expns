const { getTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.js');
const router = require('express').Router();
const { auth } = require('../middleware/auth.js');

router
  .get('/get-transactions', auth, getTransactions)
  .post('/add-transaction', auth, addTransaction)
  .put('/update-transaction/:id', auth, updateTransaction)
  .delete('/delete-transaction/:id', auth, deleteTransaction);

module.exports = router;