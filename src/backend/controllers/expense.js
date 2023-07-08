const ExpenseSchema = require('../models/expense.js');

exports.addExpense = async (req, res) => { 
	const {title, amount, date, category, description} = req.body;
	const expense = ExpenseSchema({ 
		title,
		amount,
		category,
		description,
		date
	});
	try {
		if(!title || !amount || !date || !category || !description) {
			return res.status(400).json({error: 'All fields are required'});
		}
		if(amount <= 0 || !amount === 'number' ) {
			return res.status(400).json({error: 'Error defining amount'});
		}
		await expense.save();
		res.status(200).json({message: 'Expense added successfully'});
	} catch (error) {
		res.status(500).json({error: error.message});
	}
};

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await ExpenseSchema.find().sort({createdAt: -1});
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
}

exports.deleteExpense = async (req, res) => {
	const {id} = req.params;
	ExpenseSchema.findByIdAndDelete(id).then((expense) => {
		res.status(200).json({message: 'Expense deleted successfully'});
	}).catch((error) => {
		res.status(500).json({error: error.message});
	});
}