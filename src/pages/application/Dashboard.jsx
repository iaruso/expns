import categoriesData from '../../../public/categories.json';
import React, { useContext, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TransactionsContext, CurrencyContext } from './Application.jsx';
import CategoryCard from '../../components/dashsboard/CategoryCard.jsx';
import { convertCurrency } from '../../helpers/convertCurrency';
import { currencySymbol } from '../../helpers/currencySymbol';
import { currencyFormat } from '../../helpers/currencyFormat.js';
import TransactionItem from '../../components/transactions/TransactionItem.jsx';
import Icon from '../../components/app/Icon.jsx';

const Button = ({ label, onClick, selected }) => {
  return (
    <button
      className={`h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster hover:duration-[0.4s] ease-in-out ${selected ? 'bg-alabaster' : 'bg-white'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const Dashboard = () => {
  const { t } = useTranslation();
  const userTransactions = useContext(TransactionsContext);
  const currencyRates = useContext(CurrencyContext);
  const localCurrency = localStorage.getItem('currency') || 'usd';

  const sortedTransactions = userTransactions
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 20);

  console.log(sortedTransactions);

  const calculateTotalByType = (type) => {
    return userTransactions.reduce((total, transaction) => {
      if (transaction.type === type) {
        if (transaction.currency === localCurrency) {
          return total + transaction.amount;
        } else {
          const convertedAmount = convertCurrency(transaction.amount, transaction.currency, localCurrency, currencyRates);
          return total + convertedAmount;
        }
      }
      return total;
    }, 0);
  };

  const totalIncomes = useMemo(() => calculateTotalByType('incomes'), [userTransactions, localCurrency, currencyRates]);
  const totalExpenses = useMemo(() => calculateTotalByType('expenses'), [userTransactions, localCurrency, currencyRates]);
  const totalInvestments = useMemo(() => calculateTotalByType('investments'), [userTransactions, localCurrency, currencyRates]);
  const balance = useMemo(() => totalIncomes + totalInvestments - totalExpenses, [totalIncomes, totalInvestments, totalExpenses]);

  const currencyLabel = (formattedValue, currency) => {
    if (currency === 'usd') {
      return `${currencySymbol(currency)} ${formattedValue}`;
    } else {
      return `${formattedValue} ${currencySymbol(currency)}`;
    }
  };

  const categoryTypes = [
    { key: 'all', label: t('app.dashboard.categories.type.all') },
    { key: 'incomes', label: t('app.dashboard.categories.type.incomes') },
    { key: 'expenses', label: t('app.dashboard.categories.type.expenses') },
    { key: 'investments', label: t('app.dashboard.categories.type.investments') }
  ];

  const [selectedType, setSelectedType] = useState('all');

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  const renderCategories = () => {
    let selectedCategories = {};
    userTransactions.forEach((transaction) => {
      const { category, amount } = transaction;
      const parsedAmount = parseFloat(amount);
      if (!isNaN(parsedAmount)) {
        selectedCategories[category] = (selectedCategories[category] || 0) + parsedAmount;
      }
    });

    if (selectedType === 'all') {
      for (const type of categoryTypes) {
        if (type.key !== 'all') {
          const categoriesOfType = categoriesData.categories[type.key];
          selectedCategories = { ...selectedCategories, ...categoriesOfType };
        }
      }
    } else {
      const categoriesOfType = categoriesData.categories[selectedType];
      selectedCategories = { ...categoriesOfType };
    }
  
    return Object.entries(selectedCategories).map(([category, value]) => {
      let totalValue = 0;
      userTransactions.forEach(transaction => {
        if (transaction.category === category) {
          totalValue += parseFloat(convertCurrency(transaction.amount, transaction.currency, localCurrency, currencyRates));
        }
      });
      const finalTotal = totalValue;
      let categoryType = '';
      for (const type of categoryTypes) {
        if (categoriesData.categories[type.key]?.[category]) {
          categoryType = type.key;
          break;
        }
      }
      return (
        <CategoryCard 
          key={category} 
          categoryName={t(`categories.${categoryType}.${category}`)}
          total={currencyLabel(currencyFormat(finalTotal, localCurrency), localCurrency)}
          value={totalValue} 
          icon={<Icon name={category.charAt(0).toUpperCase() + category.slice(1)} className={'min-w-8 min-h-8 fill-white'}/>} 
        />
      );
    });
  }

  return (
    <>
      <div className='flex gap-4 items-center w-full sm-mobile:!grid-cols-1 mobile:grid mobile:grid-cols-2'>
        {[
          { title: 'balance', value: balance, showIcon: false},
          { title: 'incomes', value: totalIncomes, showIcon: true },
          { title: 'expenses', value: totalExpenses, showIcon: true },
          { title: 'investments', value: totalInvestments, showIcon: true }
        ].map(({ title, value, showIcon }) => (
          <div key={title} data-title={t(`app.dashboard.${title}.description`)} className={`dashboard-card w-full flex flex-1 gap-2 p-4 rounded-lg items-center justify-between bg-${title !== 'balance' ? 'white' : 'royal balance-card'} border-[0.05rem] mobile:border-[0.1rem] border-${title !== 'balance' ? 'gallery' : 'persian'} cursor-default`}>
            <div className='flex flex-col gap-2'>
              <h2 className={`text-${title !== 'balance' ? 'cod' : 'white'} text-tiny font-semibold`}>{t(`app.dashboard.${title}.title`)}</h2>
              <span className={`text-${title !== 'balance' ? 'cod' : 'white'} text-base font-bold tabular-nums`}>{currencyLabel(currencyFormat(value, localCurrency), localCurrency)}</span>
            </div>
            {showIcon && <Icon name={title.charAt(0).toUpperCase() + title.slice(1)} className='w-8 h-8 fill-cod'/>}
          </div>
        ))}
      </div>
      <div className='flex flex-col flex-1 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center justify-between h-6'>
          <h2 className='font-bold text-cod text-tiny'>{t('app.dashboard.transactions.title')}</h2>
          <div className='flex items-center h-6 gap-1'>
            <Link to='/app/transactions' className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.transactions.see_all')}
            </Link>
          </div>
        </div>
        <div className='transactions-item-list flex flex-col flex-1 overflow-y-auto bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded'>
          {sortedTransactions.map(({ _id, title, date, amount, category, type, currency }) => (
            <TransactionItem
              key={_id}
              id={_id}
              name={title}
              date={date}
              value={amount}
              category={category}
              type={type}
              currency={currency}
              localCurrency={localCurrency}
              currencyRates={currencyRates}
            />
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center justify-between h-6'>
          <h2 className='font-bold text-cod text-tiny'>{t('app.dashboard.categories.title')}</h2>
          <div className='flex items-center h-6 gap-1'>
            {categoryTypes.map(({ key, label }) => (
              <Button
                key={key}
                label={label}
                onClick={() => handleTypeSelection(key)}
                selected={selectedType === key}
              />
            ))}
          </div>
        </div>
        <div className='flex gap-2 items-center overflow-y-auto'>
          {renderCategories()}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
