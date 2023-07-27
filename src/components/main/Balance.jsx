import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/global";
import Translator from "../i18n/Translator";
import { getCurrencySymbol } from "../../helpers/currencySymbol.js";

const Balance = () => {
  const { totalBalance } = useGlobalContext();
  const [balance, setBalance] = useState(0);
	const [currency, setCurrency] = useState('eur');

  useEffect(() => {
		const savedCurrency = localStorage.getItem('currency');
		setCurrency(savedCurrency || 'eur');
    setBalance(totalBalance);
  }, [totalBalance]);

  const formatBalance = (balance, currency) => {
		const formattedBalance = parseFloat(balance).toFixed(2);
		const [wholePart, decimalPart] = formattedBalance.split(".");
		const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		let balanceWithSymbol = currency === 'usd' ? `$${formattedWholePart},${decimalPart}` : `${formattedWholePart},${decimalPart}${getCurrencySymbol(currency)}`;
		if (balance < 0) {
			balanceWithSymbol = balanceWithSymbol.replace(currency === 'usd' ? '$-' : '-', `-${currency === 'usd' ? '$' : ''}`);
		}

		return balanceWithSymbol;
	};

  return (
    <div className="w-full bg-main rounded-lg flex justify-between items-center h-10 px-2 py-4">
      <p className="text-white font-bold text-tiny"><Translator path="main.balance"/></p>
      <p className="text-white font-bold text-tiny tabular-nums">{formatBalance(balance, currency)}</p>
    </div>
  );
};

export default Balance;
