import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGlobalContext } from '../context/global.jsx';
import Topbar from "../components/navigation/Topbar.jsx";
import LogoutButton from "../components/auth/Logout.jsx";
import Form from "../components/transactions/Form.jsx";

export default function Transactions() {
	const { isAuthenticated } = useAuth0();
	useEffect(() => {
		!isAuthenticated && window.location.replace("/#");
	}, [isAuthenticated]);

	// const { incomes, getIncomes, addIncome, updateIncome, deleteIncome, totalIncomes, expenses, getExpenses, addExpense, updateExpense, deleteExpense, totalExpenses, totalBalance, transactionHistory, getRates, rates } = useGlobalContext();
	// const [selectedCurrency, setSelectedCurrency] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [incomeData, setIncomeData] = useState({ title: '', amount: '', currency: '', category: null, description: '', date: null });
  // const [expenseData, setExpenseData] = useState({ title: '', amount: '', currency: '', category: null, description: '', date: null });
	// const [currentCurrency, setCurrentCurrency] = useState('null');
  // const incomeCategories = [
	// 	{ value: 'salary', label: 'Salary' },
	// 	{ value: 'investments', label: 'Investments' },
	// 	{ value: 'gifts', label: 'Gifts' }
	// ];

	// const expenseCategories = [
	// 	{ value: 'housing', label: 'Housing' },
	// 	{ value: 'transportation', label: 'Transportation' },
	// 	{ value: 'food', label: 'Food' },
	// 	{ value: 'health', label: 'Health' },
	// 	{ value: 'entertainment', label: 'Entertainment' },
	// 	{ value: 'utilities', label: 'Utilities' },
	// 	{ value: 'debt', label: 'Debt' },
	// 	{ value: 'education', label: 'Education' },
	// 	{ value: 'travel', label: 'Travel' }
	// ];

	// const currencyOptions = [
	// 	{ value: 'usd', label: 'USD' },
	// 	{ value: 'eur', label: 'EUR' },
	// 	{ value: 'gbp', label: 'GBP' }
	// ];

	// const currencySymbols = {
	// 	usd: '$',
	// 	eur: '€',
	// 	gbp: '£'
	// };

	// const incomeCategoryOptions = [ ...incomeCategories, { value: 'other', label: 'Other' } ];
	// const expenseCategoryOptions = [ ...expenseCategories, { value: 'other', label: 'Other' } ];
	// const categoryOptions = [ ...incomeCategories, ...expenseCategories, { value: 'other', label: 'Other' } ];

  // const [selectedIncome, setSelectedIncome] = useState(null);
	// const [selectedExpense, setSelectedExpense] = useState(null);
	// const [selectedCategories, setSelectedCategories] = useState([]);
  // const [isEditIncomeDialogOpen, setIsEditIncomeDialogOpen] = useState(false);
	// const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState(false);
	// const [sortColumn, setSortColumn] = useState('date');
	// const [isDescending, setIsDescending] = useState(true);
	// const [searchQuery, setSearchQuery] = useState('');
	// const [startDate, setStartDate] = useState(null);
	// const [endDate, setEndDate] = useState(null);
	// const [minAmount, setMinAmount] = useState('');
	// const [maxAmount, setMaxAmount] = useState('');
	// const [selectedFilter, setSelectedFilter] = useState('All');

  // useEffect(() => {
	// 	if(isAuthenticated) {
	// 		setCurrentCurrency('eur'); // Default currency, later make it based on user preference localStorage
	// 		getRates();
	// 		getIncomes();
	// 		getExpenses();
	// 	}
  // }, []);

  // const handleDeleteIncome = (id) => {
  //   deleteIncome(id);
  // };

  // const handleDeleteExpense = (id) => {
  //   deleteExpense(id);
  // };

  // const handleIncomeChange = (e) => {
  //   setIncomeData({ ...incomeData, [e.target.name]: e.target.value });
  // };

  // const handleExpenseChange = (e) => {
  //   setExpenseData({ ...expenseData, [e.target.name]: e.target.value });
  // };

  // const handleIncomeSubmit = (e) => {
  //   e.preventDefault();
  //   const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
	// 	const amountWithTwoDecimals = parseFloat(incomeData.amount).toFixed(2);
  //   const updatedIncomeData = { ...incomeData, currency: selectedCurrency.value, category: selectedCategory ? selectedCategory.value : 'Other', date: formattedDate, amount: amountWithTwoDecimals };
  //   const jsonData = JSON.stringify(updatedIncomeData);
  //   addIncome(jsonData);
  //   setIncomeData({ title: '', amount: '', currency: '', category: null, description: '', date: null });
  // };

  // const handleExpenseSubmit = (e) => {
	// 	e.preventDefault();
	// 	const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
	// 	const amountWithTwoDecimals = parseFloat(expenseData.amount).toFixed(2);
	// 	const updatedExpenseData = { ...expenseData, currency: selectedCurrency.value, category: selectedCategory ? selectedCategory.value : '', date: formattedDate,	amount: amountWithTwoDecimals };
	// 	const jsonData = JSON.stringify(updatedExpenseData);
	// 	addExpense(jsonData);
	// 	setExpenseData({ title: '', amount: '', currency: '', category: null, description: '', date: null });
	// };


  // const openEditIncomeDialog = (income) => {
  //   setSelectedIncome(income);
  //   setIsEditIncomeDialogOpen(true);
  // };

	// const openEditExpenseDialog = (expense) => {
  //   setSelectedExpense(expense);
  //   setIsEditExpenseDialogOpen(true);
  // };

  // const handleEditIncomeChange = (e) => {
	// 	// console.log(selectedIncome);
  //   setSelectedIncome({ ...selectedIncome, [e.target.name]: e.target.value });
  // };

	// const handleEditExpenseChange = (e) => {
  //   setSelectedExpense({ ...selectedExpense, [e.target.name]: e.target.value });
  // };

  // const handleEditIncomeSubmit = (e) => {
	// 	e.preventDefault();
	// 	const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-') : selectedIncome.date;
	// 	const updatedIncomeData = {
	// 		title: selectedIncome.title,
	// 		amount: parseFloat(selectedIncome.amount),
	// 		currency: selectedIncome.currency,
	// 		category: selectedIncome.category,
	// 		description: selectedIncome.description,
	// 		date: formattedDate
	// 	};
	// 	const jsonData = JSON.stringify(updatedIncomeData);
	// 	updateIncome(selectedIncome._id, jsonData);
	// 	setIsEditIncomeDialogOpen(false);
	// };

	// const handleEditExpenseSubmit = (e) => {
  //   e.preventDefault();
  //   const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-') : selectedExpense.date;
  //   const updatedExpenseData = {
  //     title: selectedExpense.title,
  //     amount: parseFloat(selectedExpense.amount),
	// 		currency: selectedExpense.currency,
  //     category: selectedExpense.category,
  //     description: selectedExpense.description,
  //     date: formattedDate
  //   };
  //   const jsonData = JSON.stringify(updatedExpenseData);
  //   updateExpense(selectedExpense._id, jsonData);
  //   setIsEditExpenseDialogOpen(false);
  // };

  // const cancelEditIncome = () => {
  //   setIsEditIncomeDialogOpen(false);
  // };
	// const cancelEditExpense = () => {
  //   setIsEditExpenseDialogOpen(false);
  // }

	// const toggleSortOrder = () => {
	// 	setIsDescending((prevIsDescending) => !prevIsDescending);
	// };

	// const handleSearchChange = (e) => {
	// 	setSearchQuery(e.target.value);
	// };
	return (
		<>
			<div className='w-[21.625rem] flex flex-col gap-2'>
				<LogoutButton />
				<Topbar value={false}/>
				<Form/>
			</div>
		</>
	)
}

{/* 
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

*/}