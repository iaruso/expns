import './App.css'
import { useEffect } from 'react'
import { useGlobalContext } from './context/global'

function App() {

  const { incomes, getIncomes, totalIncomes, getExpenses, totalExpenses, totalBalance } = useGlobalContext();

  useEffect(() => {
    getIncomes();
		getExpenses();
		console.log('aa');
  }, []);

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
              <hr />
            </div>
          ))
        ) : (
          <p>No incomes to display</p>
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
