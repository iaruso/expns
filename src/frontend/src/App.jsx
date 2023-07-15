import React, { useState, useEffect } from 'react';
import './App.css';
import { useGlobalContext } from './context/global';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const { incomes, getIncomes, addIncome, updateIncome, deleteIncome, totalIncomes, expenses, getExpenses, addExpense, updateExpense, deleteExpense, totalExpenses, totalBalance, transactionHistory } = useGlobalContext();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [incomeData, setIncomeData] = useState({ title: '', amount: '', category: null, description: '', date: null });
  const [expenseData, setExpenseData] = useState({ title: '', amount: '', category: null, description: '', date: null });
  const categoryOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];
  const [selectedIncome, setSelectedIncome] = useState(null);
	const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditIncomeDialogOpen, setIsEditIncomeDialogOpen] = useState(false);
	const [isEditExpenseDialogOpen, setIsEditExpenseDialogOpen] = useState(false);
	const [sortColumn, setSortColumn] = useState('date');
	const [isDescending, setIsDescending] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
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
    const updatedIncomeData = { ...incomeData, category: selectedCategory ? selectedCategory.value : 'Other', date: formattedDate };
    const jsonData = JSON.stringify(updatedIncomeData);
    addIncome(jsonData);
    setIncomeData({ title: '', amount: '', category: null, description: '', date: null });
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const updatedExpenseData = { ...expenseData, category: selectedCategory ? selectedCategory.value : '', date: formattedDate };
    const jsonData = JSON.stringify(updatedExpenseData);
    addExpense(jsonData);
    setExpenseData({ title: '', amount: '', category: null, description: '', date: null });
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
			category: selectedIncome.category.value,
			description: selectedIncome.description,
			date: formattedDate
		};
		const jsonData = JSON.stringify(updatedIncomeData);
		console.log(jsonData);
		updateIncome(selectedIncome._id, jsonData);
		setIsEditIncomeDialogOpen(false);
	};

	const handleEditExpenseSubmit = (e) => {
    e.preventDefault();
    const formattedDate = selectedDate ? selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-') : selectedExpense.date;
    const updatedExpenseData = {
      title: selectedExpense.title,
      amount: parseFloat(selectedExpense.amount),
      category: selectedExpense.category.value,
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

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        {incomes.length > 0 ? (
          incomes.map((income) => (
            <div key={income._id}>
              <p>Title: {income.title}</p>
              <p>Amount: {income.amount}</p>
              <p>Category: {income.category}</p>
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
              <p>Amount: {expense.amount}</p>
              <p>Category: {expense.category}</p>
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
          <Select options={categoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category" required/>
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
          <Select options={categoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category" required/>
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
            <Select options={categoryOptions} value={selectedIncome.category} onChange={(selectedOption) => handleEditIncomeChange({ target: { name: 'category', value: selectedOption } })} placeholder="Select a category" />
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
            <Select options={categoryOptions} value={selectedExpense.category} onChange={(selectedOption) => handleEditExpenseChange({ target: { name: 'category', value: selectedOption } })} placeholder="Select a category" />
            <input type="text" name="description" placeholder="Description" value={selectedExpense.description} onChange={handleEditExpenseChange} />
            <DatePicker selected={new Date(selectedExpense.date)} onChange={(date) => handleEditExpenseChange({ target: { name: 'date', value: date } })} dateFormat="MM-dd-yyyy" placeholderText="Select a date" />
            <button type="submit">Save</button>
            <button onClick={cancelEditExpense}>Cancel</button>
          </form>
        </div>
      )}
			<div>
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
				<div>
					Search:
					<input
						type="text"
						value={searchQuery}
						onChange={handleSearchChange}
						placeholder="Search by title"
					/>
				</div>
			</div>

			{transactionHistory(searchQuery, sortColumn, isDescending).map((transaction) => (
				<div key={transaction._id}>
					<p>Title: {transaction.title}</p>
					<p>Amount: {transaction.amount}</p>
					<p>Category: {transaction.category}</p>
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
