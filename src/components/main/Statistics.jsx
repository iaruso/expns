import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/global";
import Translator from "../i18n/Translator";
import { formatValue } from "../../helpers/formatValue.js";
import StatisticItem from "./StatisticItem";

const Statistics = () => {
  const { totalIncomes, totalExpenses, getTotalCategorizedIncomes, getTotalCategorizedExpenses } = useGlobalContext();
  const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [activeButton, setActiveButton] = useState("incomes");
	const incomeCategories = ['salary', 'investments', 'gifts'];
	const expenseCategories = ['housing', 'transportation', 'food', 'health', 'entertainment', 'utilities',	'debt',	'education', 'travel'];

	useEffect(() => {
		setIncome(totalIncomes);
	}, [totalIncomes]);

	useEffect(() => {
		setExpense(totalExpenses);
	}, [totalExpenses]);

	const handleButtonClick = (button) => {
		setActiveButton(button);
	};

  return (
    <div className="w-full flex flex-col gap-2">
			<div className="w-full flex justify-between h-6">
				<h2 className="text-main font-semibold text-sm h6 flex justify-center items-center pl-2">Monthly statistics</h2>
				<a className="text-main font-semibold text-xs h6 flex justify-center items-center px-2 rounded hover:bg-secondaryHover">See all</a>
			</div>
			<div className="h-10 flex gap-2">
				<a className={`h-10 cursor-pointer flex justify-center items-center font-semibold text-xs rounded-lg w-full ${activeButton === "incomes" ? "bg-main text-white" : "bg-secondary text-main"}`} onClick={() => handleButtonClick("incomes")}>Incomes</a>
      	<a className={`h-10 cursor-pointer flex justify-center items-center font-semibold text-xs rounded-lg w-full ${activeButton === "expenses" ? "bg-main text-white" : "bg-secondary text-main"}`} onClick={() => handleButtonClick("expenses")}>Expenses</a>
			</div>
			<div className="flex flex-col gap-1">
				{activeButton === "expenses" ? (
					<>
						<StatisticItem category="total" value={formatValue(expense)} total={true}/>
						{expenseCategories.map((category, index) => (
							<StatisticItem key={index} category={category} value={formatValue(getTotalCategorizedExpenses(category))}/>
						))}
					</>
				) : (
					<>
						<StatisticItem category="total" value={formatValue(income)} total={true}/>
						{incomeCategories.map((category, index) => (
							<StatisticItem key={index} category={category} value={formatValue(getTotalCategorizedIncomes(category))}/>
						))}
					</>
				)}
			</div>
    </div>
  );
};

export default Statistics;
