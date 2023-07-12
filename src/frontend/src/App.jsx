import React, { useState, useEffect } from 'react';
import './App.css';
import { useGlobalContext } from './context/global';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function App() {
  const { incomes, getIncomes, addIncome, deleteIncome, totalIncomes, expenses, getExpenses, addExpense, deleteExpense, totalExpenses, totalBalance } = useGlobalContext();
	// Later create of each one (income and expense)
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [incomeData, setIncomeData] = useState({ title: '', amount: '', category: null, description: '', date: null });
	const [expenseData, setExpenseData] = useState({ title: '', amount: '', category: null, description: '', date: null });
	const categoryOptions = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' },
	];

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
		const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')
		const updatedIncomeData = { ...incomeData, category: selectedCategory ? selectedCategory.value : 'Other',	date: formattedDate };
		const jsonData = JSON.stringify(updatedIncomeData);
		addIncome(jsonData);
		setIncomeData({ title: '',	amount: '',	category: null,	description: '', date: null });
	};

	const handleExpenseSubmit = (e) => {
		e.preventDefault();
		const formattedDate = selectedDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).replace(/\//g, '-')
		const updatedExpenseData = { ...expenseData, category: selectedCategory ? selectedCategory.value : '', date: formattedDate };
		const jsonData = JSON.stringify(updatedExpenseData);
		addExpense(jsonData);
		setExpenseData({ title: '',	amount: '',	category: null,	description: '', date: null });
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
					<input type="text" name="title"	placeholder="Title"	value={incomeData.title} onChange={handleIncomeChange}/>
					<input type="number" name="amount" placeholder="Amount"	value={incomeData.amount}	onChange={handleIncomeChange}/>
					<Select options={categoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category"/>
					<input type="text" name="description" placeholder="Description" value={incomeData.description} onChange={handleIncomeChange}/>
					<DatePicker selected={selectedDate} onChange={setSelectedDate} dateFormat="MM-dd-yyyy" placeholderText="Select a date"/>
					<button type="submit">Add Income</button>
				</form>
			</div>
			<div>
				Create expense:
				<form onSubmit={handleExpenseSubmit}>
					<input type="text" name="title" placeholder="Title" value={expenseData.title} onChange={handleExpenseChange}/>
					<input type="number" name="amount" placeholder="Amount" value={expenseData.amount} onChange={handleExpenseChange}/>
					<Select options={categoryOptions} value={selectedCategory} onChange={setSelectedCategory} placeholder="Select a category"/>
					<input type="text" name="description" placeholder="Description" value={expenseData.description} onChange={handleExpenseChange}/>
					<DatePicker selected={selectedDate} onChange={setSelectedDate} dateFormat="MM-dd-yyyy" placeholderText="Select a date"/>
					<button type="submit">Add Expense</button>
				</form>
			</div>
      <div>Income: {totalIncomes()}</div>
      <div>Expenses: {totalExpenses()}</div>
      <div>Difference: {totalBalance()}</div>
    </>
  );
}

export default App;
