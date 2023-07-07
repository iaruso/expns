exports.addIncome = async (req, res) => { 
	const {title, amount, date, category, description} = req.body;
	const income = IncomeSchema({ 
		title,
		amount,
		category,
		description,
		date
	});
	
};