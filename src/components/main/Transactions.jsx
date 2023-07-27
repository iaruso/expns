import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/global";
import Translator from "../i18n/Translator";
import { formatValue } from "../../helpers/formatValue.js";
import TransactionItem from "./TransactionItem";

const Transactions = () => {
  const {latestTransactions } = useGlobalContext();
	const [latestTransactionsValue, setLatestTransactionsValue] = useState([]);
	useEffect(() => {
		latestTransactions();
		setLatestTransactionsValue(latestTransactions);
	}, [latestTransactions]);

	useEffect(() => {
		console.log(latestTransactionsValue);
	}, [latestTransactionsValue]);
  return (
    <div className="w-full flex flex-col gap-2">
			<div className="w-full flex justify-between h-6">
				<h2 className="text-main font-semibold text-sm h6 flex justify-center items-center pl-2">Latest transactions</h2>
				<Link className="text-main font-semibold text-xs h6 flex justify-center items-center px-2 rounded hover:bg-secondaryHover" to="/transactions">See all</Link>
			</div>
			<div className="flex flex-col gap-1">
				{latestTransactionsValue.map((transaction, index) => (
					<TransactionItem key={index} name={transaction.title} value={transaction.amount}/>
				))}
			</div>
    </div>
  );
};

export default Transactions;
