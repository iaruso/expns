import React, { useState, useContext } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null); /* Set errors in backend later */

	/* 📈 Income functions */ 
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

	const addIncome = async (income) => {
		try {
			const response = await axios.post(`${BASE_URL}/add-income`, income, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response.data);
			getIncomes()
		} catch (error) {
			console.log(error.message);
		}
	}

	const updateIncome = async (id, income) => {
		try {
			const response = await axios.put(`${BASE_URL}/update-income/${id}`, income, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response.data);
			getIncomes();
		} catch (error) {
			console.log(error.message);
		}
	};

	const deleteIncome = async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/delete-income/${id}`)
			console.log(response.data);
			getIncomes()
		} catch (error) {
			console.log(error.message);
		}
	}

	const totalIncomes = () => {
		let total = 0;
		incomes.forEach((income) =>{
			total = total + income.amount
		})
		return total;
	}

	/* 📉 Expense functions */
	const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expenses`);
      setExpenses(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

	const addExpense = async (expense) => {
		try {
			const response = await axios.post(`${BASE_URL}/add-expense`, expense, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response.data);
			getExpenses()
		} catch (error) {
			console.log(error.message);
		}
	}

	const updateExpense = async (id, expense) => {
		try {
			const response = await axios.put(`${BASE_URL}/update-expense/${id}`, expense, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			console.log(response.data);
			getExpenses();
		} catch (error) {
			console.log(error.message);
		}
	};

	const deleteExpense = async (id) => {
		try {
			const response = await axios.delete(`${BASE_URL}/delete-expense/${id}`)
			console.log(response.data);
			getExpenses()
		} catch (error) {
			console.log(error.message);
		}
	}

	const totalExpenses = () => {
		let total = 0;
		expenses.forEach((expense) =>{
			total = total + expense.amount
		})
		return total;
	}

	/* Other functions */
	const totalBalance = () => {
		return totalIncomes() - totalExpenses()
	}

	/* LATER mix the selectedFilter with selectedCategories */
	const transactionHistory = (searchQuery, orderBy, isDescending, startDate, endDate, selectedCategories, minAmount, maxAmount, selectedFilter) => {
		const filteredBySearch = [...incomes, ...expenses].filter((transaction) =>
			transaction.title.toLowerCase().replace(/\s+/g, ' ').includes(searchQuery.toLowerCase().replace(/\s+/g, ' '))
		);

		const filteredByDate = filteredBySearch.filter((transaction) => {
			const transactionDate = new Date(transaction.date);
			if (startDate && endDate) {
				return transactionDate >= startDate && transactionDate <= endDate;
			} else if (startDate) {
				return transactionDate >= startDate;
			} else if (endDate) {
				return transactionDate <= endDate;
			}
			return true;
		});

		const filteredByCategories = selectedCategories.length > 0
			? filteredByDate.filter((transaction) => selectedCategories.some(category => category.value === transaction.category))
			: filteredByDate;

		const filteredByAmount = filteredByCategories.filter((transaction) => {
			const amount = parseFloat(transaction.amount);
			const minAmountValue = minAmount ? parseFloat(minAmount) : Number.NEGATIVE_INFINITY;
			const maxAmountValue = maxAmount ? parseFloat(maxAmount) : Number.POSITIVE_INFINITY;
			return amount >= minAmountValue && amount <= maxAmountValue;
		});

		const filteredByType = selectedFilter === 'All'
			? filteredByAmount
			: filteredByAmount.filter((transaction) => {
				if (selectedFilter === 'Incomes') {
					return transaction.type === 'income';
				} else if (selectedFilter === 'Expenses') {
					return transaction.type === 'expense';
				}
				return true; // Filter by 'All' option
			});

		const sortedHistory = filteredByType.sort((a, b) => {
			let comparison = 0;
			switch (orderBy) {
				case 'date':
					comparison = new Date(a.date) - new Date(b.date);
					break;
				case 'amount':
					comparison = a.amount - b.amount;
					break;
				default:
					break;
			}
			return isDescending ? -comparison : comparison;
		});

		return sortedHistory;
	};

  return (
    <GlobalContext.Provider value={{ 
			getIncomes, addIncome, updateIncome, deleteIncome, totalIncomes, incomes, 
			getExpenses, addExpense, updateExpense, deleteExpense, totalExpenses, expenses, 
			totalBalance, transactionHistory
		}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
