const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['expenses', 'incomes', 'investments'],
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 64
  },
  amount: {
    type: Number,
    required: true,
    maxLength: 32,
    trim: true
  },
  currency: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    maxLength: 256,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  }
}, { timestamps: false });

module.exports = mongoose.model('Transaction', TransactionSchema);
