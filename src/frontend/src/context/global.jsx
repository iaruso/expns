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
			const response = await axios.post(`${BASE_URL}/add-income`, income)
			console.log(response.data);
			getIncomes()
		} catch (error) {
			console.log(error.message);
		}
	}

	/* Add delete income function here */

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
			const response = await axios.post(`${BASE_URL}/add-expense`, expense)
			console.log(response.data);
			getExpenses()
		} catch (error) {
			console.log(error.message);
		}
	}

	/* Add delete expense  function here */

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
			getIncomes, addIncome, totalIncomes, incomes, 
			getExpenses, addExpense, totalExpenses, expenses, 
			totalBalance 
		}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
