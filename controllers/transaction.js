const Transaction = require('../models/transaction.js');

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.headers['user-id'];
    const { type, startDate, endDate, minAmount, maxAmount } = req.query;
    
    // Build query object
    const query = { userId };
    if (type && ['expense', 'income', 'investment', 'all'].includes(type)) {
      if (type !== 'all') {
        query.type = type;
      }
    }
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) {
        query.amount.$gte = parseFloat(minAmount);
      }
      if (maxAmount) {
        query.amount.$lte = parseFloat(maxAmount);
      }
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.addTransaction = async (req, res) => {
  const { title, amount, currency, date, category, description, type } = req.body;
  const userId = req.headers['user-id'];
  
  try {
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: 'User ID invalid' });
    }
    if (!Transaction.schema.path('type').enumValues.includes(type)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    if (!title || !amount || !currency || !date  || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Error defining amount' });
    }

    const transaction = new Transaction({ title, amount, currency, category, description, date, type, userId });
    await transaction.save();
    res.status(200).json({ message: 'Transaction added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['user-id'];
  const { title, amount, currency, date, category, description, type } = req.body;
  try {
    if (!userId || userId.length !== 24) {
      return res.status(400).json({ error: 'User ID invalid' });
    }
    if (!Transaction.schema.path('type').enumValues.includes(type)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    if (!title || !amount || !currency || !date || !category) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Error defining amount' });
    }

    const updatedTransaction = { title, amount, currency, date, category, description, type };
    const transaction = await Transaction.findOneAndUpdate({ _id: id, userId: userId }, updatedTransaction, { new: true });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction updated successfully', transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  const userId = req.headers['user-id'];
  try {
    const transaction = await Transaction.findOneAndDelete({ _id: id, userId: userId });
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
