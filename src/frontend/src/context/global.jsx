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

  return (
    <GlobalContext.Provider value={{ 
			getIncomes, addIncome, deleteIncome, totalIncomes, incomes, 
			getExpenses, addExpense, deleteExpense, totalExpenses, expenses, 
			totalBalance 
		}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
