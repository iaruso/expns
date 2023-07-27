import React, { useState, useEffect } from "react";
import { getCurrencySymbol } from "../../helpers/currencySymbol.js";
import { formatValue } from "../../helpers/formatValue.js";

const TransactionItem = ({ name, date, value }) => {
	const [currency, setCurrency] = useState('eur');
	const formattedDate = date.split('T')[0];
  useEffect(() => {
		const savedCurrency = localStorage.getItem('currency');
		setCurrency(savedCurrency || 'eur');
  }, []);

  return (
    <div className='w-full flex justify-between items-center rounded h-6 px-2 text-min bg-secondary text-main'>
			<p>{name}</p>
			<div className="flex items-center">
				<p className="w-[4rem] flex justify-end text-tertiary tabular-nums">{formattedDate}</p>
				<p className="w-[4rem] flex justify-end tabular-nums">{currency === 'usd' ? '$' + formatValue(value) : formatValue(value) + getCurrencySymbol(currency)}</p>
			</div>
    </div>
  );
};

export default TransactionItem;