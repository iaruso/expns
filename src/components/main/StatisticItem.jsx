import React, { useState, useEffect } from "react";
import Translator from "../i18n/Translator";
import { getCurrencySymbol } from "../../helpers/currencySymbol.js";
import { formatValue } from "../../helpers/formatValue.js";

const StatisticItem = ({ value, category, total = false }) => {
	const [currency, setCurrency] = useState('eur');

  useEffect(() => {
		const savedCurrency = localStorage.getItem('currency');
		setCurrency(savedCurrency || 'eur');
  }, []);

  return (
    <div className={`w-full flex justify-between items-center rounded h-6 px-2 text-min ${ total ? 'bg-main text-white' : 'bg-secondary text-main'}`}>
			<p><Translator path={`categories.${category}`}/></p>
			<p>{currency === 'usd' ? '$' + formatValue(value) : formatValue(value) + getCurrencySymbol(currency)}</p>
    </div>
  );
};

export default StatisticItem;