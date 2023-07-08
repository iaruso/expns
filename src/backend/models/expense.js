const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		maxLength: 64
	},
	amount: {
		type: Number,
		required: true,
		maxLength: 16,
		trim: true
	},
	type: {
		type: String,
		default: 'expense',
	},
	category: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		maxLength: 256,
		trim: true
	},
	date: {
		type: Date,
		required: true,
		trim: true	
	}
}, {timestamps: true});

module.exports = mongoose.model('Expense', ExpenseSchema);