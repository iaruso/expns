const ExpenseSchema = require('../models/expense.js');

exports.getExpenses = async (req, res) => {
	try {
		const expenses = await ExpenseSchema.find().sort({createdAt: -1});
		res.status(200).json(expenses);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
}

exports.addExpense = async (req, res) => { 
	const {title, amount, date, category, description} = req.body;
	const expense = ExpenseSchema({ title, amount, category, description, date });
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

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, date, category, description } = req.body;
  try {
    if (!title || !amount || !date || !category || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Error defining amount' });
    }
    const updatedExpense = { title, amount, date, category, description,};
    const expense = await ExpenseSchema.findByIdAndUpdate(id, updatedExpense, { new: true });
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense updated successfully', expense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findById(id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};