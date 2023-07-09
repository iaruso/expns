import './App.css'
import { useEffect } from 'react'
import { useGlobalContext } from './context/global'

function App() {

  const { incomes, getIncomes } = useGlobalContext();

  useEffect(() => {
    getIncomes();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div>
        {incomes.map((income) => (
          <div key={income._id}>
            <p>Title: {income.title}</p>
            <p>Amount: {income.amount}</p>
            <p>Type: {income.type}</p>
            <p>Category: {income.category}</p>
            <p>Description: {income.description}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
