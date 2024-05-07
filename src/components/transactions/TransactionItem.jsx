import React from 'react';
import { useTranslation } from 'react-i18next';
import { convertCurrency } from '../../helpers/convertCurrency.js';
import { currencySymbol } from '../../helpers/currencySymbol.js';
import { currencyFormat } from '../../helpers/currencyFormat.js';
import Icon from '../app/Icon.jsx';

const TransactionItem = ({ id, name, date, value, category, type, currency, localCurrency, currencyRates }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const currencyLabel = (formattedValue, currency) => {
    if (currency === 'usd') {
      return `${currencySymbol(currency)} ${formattedValue}`;
    } else {
      return `${formattedValue} ${currencySymbol(currency)}`;
    }
  };

  return (
    <div className='h-8 w-full flex items-center gap-1 py-1 px-2 hover:bg-alabaster hover:duration-[0.4s] ease-in-out cursor-pointer' data-id={id}>
      <Icon name={category.charAt(0).toUpperCase() + category.slice(1)} className='w-4 h-4 fill-chalice'/>
      <span className='text-sm text-cod font-medium flex-1'>{name}</span>
      <span className='text-sm text-gray font-medium'>({formatDate(date)})</span>
      <span className='text-sm text-cod font-medium w-24 text-end tabular-nums'>{currencyLabel(currencyFormat(convertCurrency(value, currency, localCurrency, currencyRates), localCurrency), localCurrency)}</span>
      <Icon name={type.charAt(0).toUpperCase() + type.slice(1)} className='w-4 h-4 fill-chalice mt-[1px]'/>
    </div>
  );
};

export default TransactionItem;
