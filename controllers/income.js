const IncomeSchema = require('../models/income.js');

exports.getIncomes = async (req, res) => {
	try {
		const incomes = await IncomeSchema.find().sort({createdAt: -1});
		res.status(200).json(incomes);
	} catch (error) {
		res.status(500).json({error: error.message});
	}
}

exports.addIncome = async (req, res) => { 
	const {title, amount, currency, date, category, description} = req.body;
	const income = IncomeSchema({ 
		title,
		amount,
		currency,
		category,
		description,
		date
	});
	try {
		if(!title || !amount || !currency || !date || !category || !description) {
			return res.status(400).json({error: 'All fields are required'});
		}
		if(amount <= 0 || !amount === 'number' ) {
			return res.status(400).json({error: 'Error defining amount'});
		}
		await income.save();
		res.status(200).json({message: 'Income added successfully'});
	} catch (error) {
		res.status(500).json({error: error.message});
	}
};

exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const { title, amount, currency, date, category, description } = req.body;
  try {
    if (!title || !amount || !currency || !date || !category || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (amount <= 0 || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Error defining amount' });
    }
    const updatedIncome = { title, amount, currency, date, category, description,};
    const income = await IncomeSchema.findByIdAndUpdate(id, updatedIncome, { new: true });
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    res.status(200).json({ message: 'Income updated successfully', income });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  try {
    const income = await IncomeSchema.findById(id);
    if (!income) {
      return res.status(404).json({ error: 'Income not found' });
    }
    await IncomeSchema.findByIdAndDelete(id);
    res.status(200).json({ message: 'Income deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};