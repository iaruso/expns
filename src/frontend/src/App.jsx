import './App.css'
import { useEffect } from 'react'
import { useGlobalContext } from './context/global'

function App() {

  const { incomes, getIncomes, deleteIncome, totalIncomes, expenses, getExpenses, deleteExpense, totalExpenses, totalBalance } = useGlobalContext();

  useEffect(() => {
    getIncomes();
		getExpenses();
		console.log('aa');
  }, []);

	const handleDeleteIncome = (id) => {
    deleteIncome(id)
  }

  const handleDeleteExpense = (id) => {
    deleteExpense(id)
  }

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        {incomes.length > 0 ? (
          incomes.map((income) => (
            <div key={income._id}>
              <p>Title: {income.title}</p>
              <p>Amount: {income.amount}</p>
              <p>Type: {income.type}</p>
              <p>Category: {income.category}</p>
              <p>Description: {income.description}</p>
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
              <p>Type: {expense.type}</p>
              <p>Category: {expense.category}</p>
              <p>Description: {expense.description}</p>
							<button onClick={() => handleDeleteExpense(expense._id)}>Delete</button>
              <hr />
            </div>
          ))
        ) : (
          <p>No expenses to display</p>
        )}
      </div>
      <div>
        Income: {totalIncomes()}
      </div>
			<div>
        Expenses: {totalExpenses()}
      </div>
			<div>
        Difference: {totalBalance()}
      </div>
    </>
  );
}

export default App;
