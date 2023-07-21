import React, { useState, useEffect } from 'react';
import './App.css';
import { useGlobalContext } from './context/global';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import User from './components/auth/User';

function App() {
  const { incomes, getIncomes, addIncome, updateIncome, deleteIncome, totalIncomes, expenses, getExpenses, addExpense, updateExpense, deleteExpense, totalExpenses, totalBalance, transactionHistory, getRates, rates } = useGlobalContext();
	const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [incomeData, setIncomeData] = useState({ title: '', amount: '', currency: '', category: null, description: '', date: null });
  const [expenseData, setExpenseData] = useState({ title: '', amount: '', currency: '', category: null, description: '', date: null });
	const [currentCurrency, setCurrentCurrency] = useState('null');
  const incomeCategories = [
		{ value: 'salary', label: 'Salary' },
		{ value: 'investments', label: 'Investments' },
		{ value: 'gifts', label: 'Gifts' }
	];

	const expenseCategories = [
		{ value: 'housing', label: 'Housing' },
		{ value: 'transportation', label: 'Transportation' },
		{ value: 'food', label: 'Food' },
		{ value: 'health', label: 'Health' },
		{ value: 'entertainment', label: 'Entertainment' },
		{ value: 'utilities', label: 'Utilities' },
		{ value: 'debt', label: 'Debt' },
		{ value: 'education', label: 'Education' },
		{ value: 'travel', label: 'Travel' }
	];

	const currencyOptions = [
		{ value: 'usd', label: 'USD' },
		{ value: 'eur', label: 'EUR' },
		{ value: 'gbp', label: 'GBP' }
	];

	const currencySymbols = {
		usd: '$',
		eur: '€',
		gbp: '£'
	};

	const incomeCategoryOptions = [ ...incomeCategories, { value: 'other', label: 'Other' } ];
	const expenseCategoryOptions = [ ...expenseCategories, { value: 'other', label: 'Other' } ];
	const categoryOptions = [ ...incomeCategories, ...expenseCategories, { value: 'other', label: 'Other' } ];

  const [selectedIncome, setSelectedIncome] = useState(null);
	const [selectedExpense, setSelectedExpense] = useState(null);
	const [selectedCategories, setSelectedCategories] = useState([]);
  const [isEditIncomeDialogOpen, setIsEditIncomeDialogOpen] = useState(false);
	const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState(false);
	const [sortColumn, setSortColumn] = useState('date');
	const [isDescending, setIsDescending] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [minAmount, setMinAmount] = useState('');
	const [maxAmount, setMaxAmount] = useState('');
	const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
		setCurrentCurrency('eur'); // Default currency, later make it based on user preference
		getRates();
    getIncomes();
    getExpenses();
  }, []);

  const handleDeleteIncome = (id) => {
    deleteIncome(id);
  };

  const handleDeleteExpense = (id) => {
    deleteExpense(id);
  };

  const handleIncomeChange = (e) => {
    setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (e) => {
    setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const updatedIncomeData = { ...incomeData, currency: selectedCurrency.value, category: selectedCategory ? selectedCategory.value : 'Other', date: formattedDate };
    const jsonData = JSON.stringify(updatedIncomeData);
    addIncome(jsonData);
		console.log(jsonData);
    setIncomeData({ title: '', amount: '', currency: '', category: null, description: '', date: null });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const updatedExpenseData = { ...expenseData, currency: selectedCurrency.value, category: selectedCategory ? selectedCategory.value : '', date: formattedDate };
    const jsonData = JSON.stringify(updatedExpenseData);
    addExpense(jsonData);
    setExpenseData({ title: '', amount: '', currency: '', category: null, description: '', date: null });
  };

  const openEditIncomeDialog = (income) => {
    setSelectedIncome(income);
    setIsEditIncomeDialogOpen(true);
  };

	const openEditExpenseDialog = (expense) => {
    setSelectedExpense(expense);
    setIsEditExpenseDialogOpen(true);
  };

  const handleEditIncomeChange = (e) => {
		console.log(selectedIncome);
    setSelectedIncome({ ...selectedIncome, [e.target.name]: e.target.value });
  };

	const handleEditExpenseChange = (e) => {
    setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
  };

  const handleEditIncomeSubmit = (e) => {
		e.preventDefault();
		const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-') : selectedIncome.date;
		const updatedIncomeData = {
			title: selectedIncome.title,
			amount: parseFloat(selectedIncome.amount),
			currency: selectedIncome.currency,
			category: selectedIncome.category,
			description: selectedIncome.description,
			date: formattedDate
		};
		const jsonData = JSON.stringify(updatedIncomeData);
		updateIncome(selectedIncome._id, jsonData);
		setIsEditIncomeDialogOpen(false);
	};

	const handleEditExpenseSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-') : selectedExpense.date;
    const updatedExpenseData = {
      title: selectedExpense.title,
      amount: parseFloat(selectedExpense.amount),
			currency: selectedExpense.currency,
      category: selectedExpense.category,
      description: selectedExpense.description,
      date: formattedDate
    };
    const jsonData = JSON.stringify(updatedExpenseData);
    updateExpense(selectedExpense._id, jsonData);
    setIsEditExpenseDialogOpen(false);
  };

  const cancelEditIncome = () => {
    setIsEditIncomeDialogOpen(false);
  };
	const cancelEditExpense = () => {
    setIsEditExpenseDialogOpen(false);
  }

	const toggleSortOrder = () => {
		setIsDescending((prevIsDescending) => !prevIsDescending);
	};

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const getCategoryLabel = (value) => {
		const allCategories = [...incomeCategories, ...expenseCategories];
		const category = allCategories.find((cat) => cat.value === value);
		return category ? category.label : 'Unknown';
	};

  const convertToCurrentCurrency = (amount, currency) => {
		if ( currency !== currentCurrency ) {
			const rate = rates.find((r) => r.from === currency && r.to === currentCurrency);
			if (rate) {
				const convertedAmount = amount / rate.rate;
				return currentCurrency === 'usd' ? currencySymbols[currentCurrency] + Number(convertedAmount.toFixed(2)) : Number(convertedAmount.toFixed(2)) + currencySymbols[currentCurrency];
			}
			return 0;
		}
		return Number(amount.toFixed(2));
  };

  return (
    <>
			<User />
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
				{incomes.length > 0 ? (
					incomes.map((income) => (
						<div key={income._id}>
							<p>Title: {income.title}</p>
							<p>Amount: {convertToCurrentCurrency(income.amount, income.currency)}</p>
							<p>Category: {getCategoryLabel(income.category)}</p>
							<p>Description: {income.description}</p>
							<p>Date: {new Date(income.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
							<button onClick={() => handleDeleteIncome(income._id)}>Delete</button>
							<button onClick={() => openEditIncomeDialog(income)}>Edit</button>
							<hr />
						</div>
					))
				) : (
					<p>No incomes to display</p>
				)}
			</div>
			<div>
				{expenses.length > 0 ? (
					expenses.map((expense) => (
						<div key={expense._id}>
							<p>Title: {expense.title}</p>
							<p>Amount: {convertToCurrentCurrency(expense.amount, expense.currency)}</p>
							<p>Category: {getCategoryLabel(expense.category)}</p>
							<p>Description: {expense.description}</p>
							<p>Date: {new Date(expense.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
							<button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
							<button onClick={() => openEditExpenseDialog(expense)}>Edit</button>
							<hr />
						</div>
					))
				) : (
					<p>No expenses to display</p>
				)}
			</div>
      <div>
        Create income:
        <form onSubmit={handleIncomeSubmit}>
          <input type="text" name="title" placeholder="Title" value={incomeData.title} onChange={handleIncomeChange} required/>
          <input type="number" name="amount" placeholder="Amount" value={incomeData.amount} onChange={handleIncomeChange} required/>
					<Select options={currencyOptions} value={selectedCurrency} onChange={setSelectedCurrency} placeholder={currentCurrency.toUpperCase()} required/>
          <Select options={incomeCategoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category" required/>
          <input type="text" name="description" placeholder="Description" value={incomeData.description} onChange={handleIncomeChange} /> {/* '' is the default value for description */}
          <DatePicker selected={selectedDate} onChange={setSelectedDate} dateFormat="MM-dd-yyyy" placeholderText="Select a date" required/> {/* Set the current date by default */}
          <button type="submit">Add Income</button>
        </form>
      </div>
      <div>
        Create expense:
        <form onSubmit={handleExpenseSubmit}>
          <input type="text" name="title" placeholder="Title" value={expenseData.title} onChange={handleExpenseChange} required/>
          <input type="number" name="amount" placeholder="Amount" value={expenseData.amount} onChange={handleExpenseChange} required/>
					<Select options={currencyOptions} value={selectedCurrency} onChange={setSelectedCurrency}  placeholder={currentCurrency.toUpperCase()} required />

          <Select options={expenseCategoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category" required/>
          <input type="text" name="description" placeholder="Description" value={expenseData.description} onChange={handleExpenseChange} /> {/* '' is the default value for description */}
          <DatePicker selected={selectedDate} onChange={setSelectedDate} dateFormat="MM-dd-yyyy" placeholderText="Select a date" required/> {/* Set the current date by default */}
          <button type="submit">Add Expense</button>
        </form>
      </div>
      <div>Income: {totalIncomes()}</div>
      <div>Expenses: {totalExpenses()}</div>
      <div>Difference: {totalBalance()}</div>
      {isEditIncomeDialogOpen && selectedIncome && (
        <div>
          <h3>Edit Income</h3>
          <form onSubmit={handleEditIncomeSubmit}>
            <input type="text" name="title" placeholder="Title" value={selectedIncome.title} onChange={handleEditIncomeChange} />
            <input type="number" name="amount" placeholder="Amount" value={selectedIncome.amount} onChange={handleEditIncomeChange} />
						<Select options={currencyOptions} value={currencyOptions.find((option) => option.value === selectedIncome.currency)} onChange={(currency) => handleEditIncomeChange({ target: { name: 'currency', value: currency.value } })}/>
            <Select options={categoryOptions} value={categoryOptions.find((option) => option.value === selectedIncome.category)} onChange={(category) => handleEditIncomeChange({ target: { name: 'category', value: category.value } })} placeholder="Select a category" />
            <input type="text" name="description" placeholder="Description" value={selectedIncome.description} onChange={handleEditIncomeChange} />
            <DatePicker selected={new Date(selectedIncome.date)} onChange={(date) => handleEditIncomeChange({ target: { name: 'date', value: date } })} dateFormat="MM-dd-yyyy" placeholderText="Select a date" />
            <button type="submit">Save</button>
            <button onClick={cancelEditIncome}>Cancel</button>
          </form>
        </div>
      )}
			{isEditExpenseDialogOpen && selectedExpense && (
        <div>
          <h3>Edit Expense</h3>
          <form onSubmit={handleEditExpenseSubmit}>
            <input type="text" name="title" placeholder="Title" value={selectedExpense.title} onChange={handleEditExpenseChange} />
            <input type="number" name="amount" placeholder="Amount" value={selectedExpense.amount} onChange={handleEditExpenseChange} />
						<Select options={currencyOptions} value={currencyOptions.find((option) => option.value === selectedExpense.currency)} onChange={(currency) => handleEditExpenseChange({ target: { name: 'currency', value: currency } })}/>
            <Select options={categoryOptions} value={categoryOptions.find((option) => option.value === selectedExpense.category)} onChange={(category) => handleEditExpenseChange({ target: { name: 'category', value: category } })} placeholder="Select a category" />
            <input type="text" name="description" placeholder="Description" value={selectedExpense.description} onChange={handleEditExpenseChange} />
            <DatePicker selected={new Date(selectedExpense.date)} onChange={(date) => handleEditExpenseChange({ target: { name: 'date', value: date } })} dateFormat="MM-dd-yyyy" placeholderText="Select a date" />
            <button type="submit">Save</button>
            <button onClick={cancelEditExpense}>Cancel</button>
          </form>
        </div>
      )}
			<div>
				<div>
					Search:
					<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by title"/>
				</div>
				<div>
					Sort by:
					<select value={sortColumn} onChange={(e) => setSortColumn(e.target.value)}>
						<option value="date">Date</option>
						<option value="amount">Amount</option>
					</select>
					<button onClick={toggleSortOrder}>
						{isDescending ? 'Descending' : 'Ascending'}
					</button>
				</div>
				<DatePicker
					selected={startDate}
					onChange={(date) => setStartDate(date)}
					selectsStart
					startDate={startDate}
					endDate={endDate}
					dateFormat="MM-dd-yyyy"
					placeholderText="Start Date"
				/>
				<DatePicker
					selected={endDate}
					onChange={(date) => setEndDate(date)}
					selectsEnd
					startDate={startDate}
					endDate={endDate}
					dateFormat="MM-dd-yyyy"
					placeholderText="End Date"
				/>
				<Select
					isMulti
					options={categoryOptions}
					value={selectedCategories}
					onChange={setSelectedCategories}
					className="basic-multi-select"
					classNamePrefix="select"
				/>
				<Select
					options={[
						{ value: 'All', label: 'All' },
						{ value: 'Incomes', label: 'Incomes' },
						{ value: 'Expenses', label: 'Expenses' }
					]}
					value={{ value: selectedFilter, label: selectedFilter }}
					onChange={(selectedOption) => setSelectedFilter(selectedOption.value)}
				/>
				<div>
					Min Amount:
					<input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} />
					Max Amount:
					<input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} />
				</div>
			</div>
			{transactionHistory(searchQuery, sortColumn, isDescending, startDate, endDate, selectedCategories, minAmount, maxAmount, selectedFilter).map((transaction) => (
				<div key={transaction._id}>
					<p>Title: {transaction.title}</p>
					<p>Amount: {convertToCurrentCurrency(transaction.amount, transaction.currency)}</p>
					<p>Category: {getCategoryLabel(transaction.category)}</p>
					<p>Description: {transaction.description}</p>
					<p>Date: {new Date(transaction.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}</p>
					<button onClick={() => handleDeleteExpense(transaction._id)}>Delete</button>
					<button onClick={() => openEditExpenseDialog(transaction)}>Edit</button>
					<hr />
				</div>
			))}
    </>
  );
}

export default App;
