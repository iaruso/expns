const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		maxLength: 64
	},
	userId: {
		type: String,
		required: true,
		trim: true
	},
	amount: {
		type: Number,
		required: true,
		maxLength: 16,
		trim: true
	},
	currency: {
		type: String,
		required: true,
		trim: true
	},
	type: {
		type: String,
		default: 'income',
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

module.exports = mongoose.model('Income', IncomeSchema);
