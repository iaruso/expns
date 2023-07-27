import React, { useState, useEffect } from "react";
import { getCurrencySymbol } from "../../helpers/currencySymbol.js";
import { formatValue } from "../../helpers/formatValue.js";

const TransactionItem = ({ value, name }) => {
	const [currency, setCurrency] = useState('eur');

  useEffect(() => {
		const savedCurrency = localStorage.getItem('currency');
		setCurrency(savedCurrency || 'eur');
  }, []);

  return (
    <div className='w-full flex justify-between items-center rounded h-6 px-2 text-min bg-secondary text-main'>
			<p>{name}</p>
			<p className="tabular-nums">{currency === 'usd' ? '$' + formatValue(value) : formatValue(value) + getCurrencySymbol(currency)}</p>
    </div>
  );
};

export default TransactionItem;