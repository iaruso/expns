import React, { useState, useEffect } from "react";
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from "../../context/global";
import Translator from "../i18n/Translator";
import { getCurrencySymbol } from "../../helpers/currencySymbol.js";
import TransactionItem from "./TransactionItem";

const Form = () => {
  const { transactionHistory, rates } = useGlobalContext();
	const [selectedFilter, setSelectedFilter] = useState('All');
	const [selectedFilterLabel, setSelectedFilterLabel] = useState('All'); // i18n
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const sortTypes = ['date-asc', 'date-desc', 'amount-asc', 'amount-desc'];
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [minAmount, setMinAmount] = useState('');
	const [maxAmount, setMaxAmount] = useState('');

	const [sortColumn, setSortColumn] = useState('date');
	const [isDescending, setIsDescending] = useState(true);

	const [currentCurrency, setCurrency] = useState('eur');
	// const incomeCategories = ['salary', 'investments', 'gifts'];
	// const expenseCategories = ['housing', 'transportation', 'food', 'health', 'entertainment', 'utilities',	'debt',	'education', 'travel'];
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

	const categoryOptions = [ ...incomeCategories, ...expenseCategories];
	const filteredCategories =
    selectedFilter === 'All'
      ? categoryOptions
      : selectedFilter === 'Incomes'
      ? incomeCategories
      : expenseCategories;

	

  useEffect(() => {
		const savedCurrency = localStorage.getItem('currency');
		setCurrency(savedCurrency || 'eur');
  }, []);

		const currencySymbols = {
		usd: '$',
		eur: '€',
		gbp: '£'
	};




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
			<div>
				<div>
					<Select
						options={[
							{ value: 'All', label: 'All' },
							{ value: 'Incomes', label: 'Incomes' },
							{ value: 'Expenses', label: 'Expenses' }
						]}
						value={{ label: selectedFilterLabel }}
						onChange={(selectedOption) =>  { setSelectedFilter(selectedOption.value), setSelectedFilterLabel(selectedOption.label), setSelectedCategory(null) }}
					/>
					<Select
						options={filteredCategories}
						value={selectedCategory}
						onChange={setSelectedCategory}
					/>
					<div>
						Search:
						<input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search by title"/>
					</div>
					{/* <button onClick={handleReset}>Reset</button> */}
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
				<div>
					{/* <Select 
						options={sortTypes}
						value={selectedType}
						onChange={setSelectedType}
					/> */}
					<div>
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
					</div>
					<div>
						<input type="number" value={minAmount} onChange={(e) => setMinAmount(e.target.value)} placeholder={`Min(€)`}/>
						<input type="number" value={maxAmount} onChange={(e) => setMaxAmount(e.target.value)} placeholder={`Max(€)`}/>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-1">
				{transactionHistory(searchQuery, sortColumn, isDescending, startDate, endDate, selectedCategory, minAmount, maxAmount, selectedFilter).map((transaction) => (
					<TransactionItem key={transaction._id} name={transaction.title} date={transaction.date} value={transaction.amount}/>
				))}
			</div>
		</>
  );
};

export default Form;