import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const BASE_URL = "https://expns-app-1de5602c06dc.herokuapp.com/api/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
	const { user } = useAuth0();
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
	const [rates, setRates] = useState([]);
  const [error, setError] = useState(null); /* Set errors in backend later */
	const [currentCurrency, setCurrentCurrency] = useState('eur');
	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (user) {
			const userIdFiltered = user.sub.split('|')[1];
      setUserId(userIdFiltered);
		} else {
			setUserId(null);
		}
	}, [user]);

	const convertToCurrentCurrency = (amount, currency) => {
		if (currency !== currentCurrency) {
			const rate = rates.find((r) => r.from === currency && r.to === currentCurrency);
			if (rate) {
				const convertedAmount = amount / rate.rate;
				return Number(convertedAmount.toFixed(2));
			}
			return 0;
		}
		return Number(amount.toFixed(2)); // Return the original amount
	};

	/* 📈 Income functions */ 
  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-incomes`, {
				headers: {
					'user-id': userId
				},
			});
      setIncomes(response.data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

	const addIncome = async (income) => {
		try {
			const response = await axios.post(`${BASE_URL}/add-income`, income, {
				headers: {
					'Content-Type': 'application/json',
					'user-id': userId
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
					'user-id': userId
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
			const response = await axios.delete(`${BASE_URL}/delete-income/${id}`, {
				headers: {
					'user-id': userId
				},
			})
			console.log(response.data);
			getIncomes()
		} catch (error) {
			console.log(error.message);
		}
	}

	const totalIncomes = () => {
		let total = 0;
		incomes.forEach((income) => {
			total += convertToCurrentCurrency(income.amount, income.currency);
		});
		return Number(total.toFixed(2));
	};

	/* 📉 Expense functions */
	const getExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-expenses`, {
				headers: {
					'user-id': userId
				},
			});
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
					'user-id': userId
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
					'user-id': userId
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
			const response = await axios.delete(`${BASE_URL}/delete-expense/${id}`, {
				headers: {
					'user-id': userId
				},
			})
			console.log(response.data);
			getExpenses()
		} catch (error) {
			console.log(error.message);
		}
	}

	const totalExpenses = () => {
		let total = 0;
		expenses.forEach((expense) => {
			total += convertToCurrentCurrency(expense.amount, expense.currency);
		});
		return Number(total.toFixed(2));
	};

	/* 💱 Rates functions */
	const getRates = async () => {
		try {
			const response = await axios.get(`${BASE_URL}/rates`);
			const ratesData = response.data[0];

			const { USD, GBP } = ratesData.rates;
			const eurToUsd = 1 / USD;
			const eurToGbp = 1 / GBP;
			const usdToEur = USD;
			const usdToGbp = GBP / USD;
			const gbpToEur = GBP;
			const gbpToUsd = 1 / usdToGbp;

			setRates([
				{ from: 'eur', to: 'usd', rate: eurToUsd },
				{ from: 'eur', to: 'gbp', rate: eurToGbp },
				{ from: 'usd', to: 'eur', rate: usdToEur },
				{ from: 'usd', to: 'gbp', rate: usdToGbp },
				{ from: 'gbp', to: 'eur', rate: gbpToEur },
				{ from: 'gbp', to: 'USD', rate: gbpToUsd },
			]);
		} catch (error) {
			console.log(error.message);
		}
	};

	/* Other functions */
	const totalBalance = () => {
		return totalIncomes() - totalExpenses()
	}

  const getTotalCategorizedIncomes = (category) => {
    const filteredIncomes = incomes.filter((income) => income.category === category);
    let total = 0;
    filteredIncomes.forEach((income) => {
      total += convertToCurrentCurrency(income.amount, income.currency);
    });
    return Number(total.toFixed(2));
  };

  const getTotalCategorizedExpenses = (category) => {
    const filteredExpenses = expenses.filter((expense) => expense.category === category);
    let total = 0;
    filteredExpenses.forEach((expense) => {
      total += convertToCurrentCurrency(expense.amount, expense.currency);
    });
    return Number(total.toFixed(2));
  };

	const latestTransactions = () => {
		const allTransactions = [...incomes, ...expenses];
		allTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
		return allTransactions.slice(0, 3);
	};

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
				return true;
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
    <GlobalContext.Provider value = {{ 
			getIncomes, addIncome, updateIncome, deleteIncome, totalIncomes, incomes, 
			getExpenses, addExpense, updateExpense, deleteExpense, totalExpenses, expenses,
			getRates, rates,
			totalBalance, getTotalCategorizedIncomes, getTotalCategorizedExpenses, latestTransactions,
			transactionHistory
		}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
