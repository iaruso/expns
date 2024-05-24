import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Chart } from 'react-google-charts';
import { TransactionsContext, CurrencyContext } from './Application.jsx';
import { convertCurrency } from '../../helpers/convertCurrency.js';

const Stats = () => {
  const { t, i18n } = useTranslation();
  const userTransactions = useContext(TransactionsContext);
  const currencyRates = useContext(CurrencyContext);
  const localCurrency = localStorage.getItem('currency') || 'usd';
  const [selectedType, setSelectedType] = useState('all');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('all');
  const [filteredData, setFilteredData] = useState([['Category', 'Amount']]);
  const [options, setOptions] = useState({
    pieHole: 0.4,
    is3D: false,
    legend: 'bottom',
    width: '100%',
    height: '100%',
    colors: ['#2433c2', '#2635cb', '#3444d9', '#4c5ade', '#6470e2', '#7c86e7', '#939ceb', '#abb2ef', '#c3c8f4', '#dbdef8', '#f3f4fd', '#02030c', '#070924', '#0b103c', '#101654', '#141c6c', '#182383', '#1d299b']
  });

  useEffect(() => {
    const filterTransactions = () => {
      const now = new Date();
      let filteredTransactions = userTransactions;
  
      if (selectedType !== 'all') {
        filteredTransactions = filteredTransactions.filter(transaction => transaction.type === selectedType);
      }
  
      filteredTransactions = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        switch (selectedTimeFrame) {
          case 'day':
            return now - transactionDate <= 24 * 60 * 60 * 1000;
          case 'week':
            return now - transactionDate <= 7 * 24 * 60 * 60 * 1000;
          case 'month':
            return now - transactionDate <= 30 * 24 * 60 * 60 * 1000;
          case 'year':
            return now - transactionDate <= 365 * 24 * 60 * 60 * 1000;
          case 'all':
          default:
            return true;
        }
      });
  
      const categoryMap = new Map();
      filteredTransactions.forEach(transaction => {
        const amount = transaction.amount;
        const currency = transaction.currency;
        const categoryKey = transaction.category.toLowerCase() === "other" ? 
                            t(`categories.other`) : 
                            t(`categories.${transaction.type}.${transaction.category.toLowerCase()}`);
  
        const currentAmount = categoryMap.get(categoryKey) || 0;
        categoryMap.set(categoryKey, currentAmount + convertCurrency(amount, currency, localCurrency, currencyRates));
      });
  
      const aggregatedData = [['Category', 'Amount']];
      categoryMap.forEach((amount, category) => {
        aggregatedData.push([category, amount]);
      });
  
      setFilteredData(aggregatedData);

      const newOptions = {
        ...options,
        pieHole: aggregatedData.length <= 2 ? 0 : 0.4
      };
      setOptions(newOptions);
    };
  
    filterTransactions();
  }, [selectedType, selectedTimeFrame, userTransactions]);

  return (
    <div className='flex flex-col flex-1 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
      <div className='flex items-center justify-between h-6'>
        <h2 className='font-bold text-cod text-tiny'>{t('app.stats.title')}</h2>
        <div className='flex items-center h-6 gap-1'>
          {['all', 'incomes', 'expenses', 'investments'].map(type => (
            <button
              key={type}
              className={`h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster hover:duration-[0.4s] ease-in-out ${selectedType === type ? 'bg-alabaster' : 'bg-white'}`}
              onClick={() => setSelectedType(type)}
            >
              {t(`app.stats.type.${type}`)}
            </button>
          ))}
        </div>
      </div>
      <div className='stats-content flex flex-col flex-1 overflow-y-auto bg-alabaster rounded relative'>
        <div className='absolute right-2 top-2 h-8 bg-white rounded flex items-center p-1 gap-1 z-10'>
          {['day', 'week', 'month', 'year', 'all'].map(timeFrame => (
            <button
              key={timeFrame}
              className={`h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster hover:duration-[0.4s] ease-in-out ${selectedTimeFrame === timeFrame ? 'bg-alabaster' : 'bg-white'}`}
              onClick={() => setSelectedTimeFrame(timeFrame)}
            >
              {t(`app.stats.time.${timeFrame}`)}
            </button>
          ))}
        </div>
        <Chart
          chartType='PieChart'
          data={filteredData}
          options={options}
          width={'100%'}
          height={'90%'}
          chartLanguage={i18n.language}
        />
      </div>
    </div>
  );
};

export default Stats;
