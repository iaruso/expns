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

	const transactionHistory = (searchQuery, orderBy, isDescending) => {
		const sortedHistory = [...incomes, ...expenses].sort((a, b) => {
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

		const filteredHistory = sortedHistory.filter((transaction) =>
			transaction.title.toLowerCase().replace(/\s+/g, ' ').includes(searchQuery.toLowerCase().replace(/\s+/g, ' '))
		);

		return filteredHistory;
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
