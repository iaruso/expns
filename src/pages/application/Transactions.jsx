import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-dropdown-select';
import jsonData from '../../../public/data.json';
import { TransactionsContext, CurrencyContext } from './Application.jsx';
import TransactionItem from '../../components/transactions/TransactionItem.jsx';
import Icon from '../../components/app/Icon.jsx';
import Form from '../../components/transactions/Form.jsx';

const Transactions = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const userTransactions = useContext(TransactionsContext);
  const currencyRates = useContext(CurrencyContext);

  const localCurrency = localStorage.getItem('currency') || 'usd';

  useEffect(() => {
    filterTransactions();
  }, [selectedType, selectedCategory, userTransactions, selectedSort, searchText]);

  const filterTransactions = () => {
    const filtered = userTransactions.filter(transaction => {
      const typeFilter = selectedType === 'all' || selectedType === '' || transaction.type === selectedType;
      const categoryFilter = selectedCategory === 'all' || selectedCategory === '' || transaction.category === selectedCategory;
      const searchTextFilter = transaction.title.toLowerCase().includes(searchText.toLowerCase());
      return typeFilter && categoryFilter && searchTextFilter;
    });
  
    if (selectedSort === 'sort_val_asc') {
      filtered.sort((a, b) => a.amount - b.amount);
    } else if (selectedSort === 'sort_val_desc') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (selectedSort === 'sort_date_asc') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedSort === 'sort_date_desc') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedSort === 'sort_name_asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === 'sort_name_desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
    setFilteredTransactions(filtered);
  };
  
  const resetFilters = () => {
    setSelectedType('');
    setSelectedCategory('');
    setSelectedSort('');
    setSearchText('');
    const clearButtons = document.querySelectorAll('.type-select .react-dropdown-select-clear');
    clearButtons.forEach(button => button.click());
    const categoryClearButtons = document.querySelectorAll('.category-select .react-dropdown-select-clear');
    categoryClearButtons.forEach(button => button.click());
    const sortClearButtons = document.querySelectorAll('.sort-select .react-dropdown-select-clear');
    sortClearButtons.forEach(button => button.click());
  };

  const allCategories = Object.keys(jsonData.categories).reduce((acc, type) => {
    if (type !== 'total' && type !== 'other' && type !== 'all') {
      const typeCategories = Object.keys(jsonData.categories[type]).map(category => ({ type, category }));
      return [...acc, ...typeCategories];
    }
    return acc;
  }, []);

  const filteredCategories = selectedType === 'all'
    ? allCategories
    : selectedType
      ? Object.keys(jsonData.categories[selectedType]).map(category => ({ type: selectedType, category }))
      : allCategories;

  const handleTypeChange = (selectedOptions) => {
    const newType = selectedOptions[0]?.value || 'all';
    setSelectedType(newType);
    if (selectedCategory && newType !== 'all') {
      let categoryType = 'all';
      Object.keys(jsonData.categories).forEach(type => {
        if (jsonData.categories[type][selectedCategory]) {
          categoryType = type;
        }
      });
      if (categoryType !== newType) {
        setSelectedCategory('');
        const categoryClearButtons = document.querySelectorAll('.category-select .react-dropdown-select-clear');
        categoryClearButtons.forEach(button => button.click());
      }
    }
  };
      
  const options = [
    {
      value: 'sort_val_asc',
      label: (<span title={t('app.transactions.sort.sort_val_asc')}>{t('app.transactions.sort.sort_val')} <Icon name='Ascending'/></span>)
    },
    {
      value: 'sort_val_desc',
      label: (<span title={t('app.transactions.sort.sort_val_desc')}>{t('app.transactions.sort.sort_val')} <Icon name='Descending'/></span>)
    },
    {
      value: 'sort_date_asc',
      label: (<span title={t('app.transactions.sort.sort_date_asc')}>{t('app.transactions.sort.sort_date')} <Icon name='Ascending'/></span>)
    },
    {
      value: 'sort_date_desc',
      label: (<span title={t('app.transactions.sort.sort_date_desc')}>{t('app.transactions.sort.sort_date')} <Icon name='Descending'/></span>)
    },
    {
      value: 'sort_name_asc',
      label: (<span title={t('app.transactions.sort.sort_name_asc')}>{t('app.transactions.sort.sort_name')} <Icon name='Ascending'/></span>)
    },
    {
      value: 'sort_name_desc',
      label: (<span title={t('app.transactions.sort.sort_name_desc')}>{t('app.transactions.sort.sort_name')} <Icon name='Descending'/></span>)
    }
  ];

  useEffect(() => {
    editFormData && setEditForm(!!Object.keys(editFormData).length);
  }, [editFormData]);

  return (
    <>
      <div className='flex flex-col h-full gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center h-8 gap-1'>
          <Select
            className='type-select'
            options={[
              { value: 'all', label: t('types.all') },
              { value: 'incomes', label: t('types.incomes') },
              { value: 'expenses', label: t('types.expenses') },
              { value: 'investments', label: t('types.investments') }
            ]}
            onChange={handleTypeChange}
            placeholder={t('app.transactions.type')}
            value={selectedType}
            searchable={false}
            clearable
            closeOnSelect
          />
          <Select
            className='category-select'
            options={[
              { value: 'all', label: t('categories.all') },
              ...filteredCategories.map(category => ({
                value: category.category,
                label: selectedType === 'all'
                ? t(jsonData.categories[category.type]?.[category.category])
                : t(jsonData.categories[selectedType]?.[category.category]),
              })),
              selectedType !== 'all' && { value: 'other', label: t('categories.other') }
            ].filter(option => option)}
            value={selectedCategory}
            onChange={(selectedOptions) => setSelectedCategory(selectedOptions[0]?.value || '')}
            placeholder={t('app.transactions.category')}
            searchable={false}
            clearable
            closeOnSelect
          />
          <input type='text' placeholder={t('app.transactions.search')} className='h-8 flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <Select
            className='sort-select'
            options={options}
            onChange={(selectedOptions) => setSelectedSort(selectedOptions[0]?.value || '')}
            placeholder={t('app.transactions.sort.placeholder')}
            value={options.find(option => option.value === selectedSort)}
            searchable={false}
            clearable
            closeOnSelect
          />
          <button className='h-8 w-8 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'
            onClick={() => {
              resetFilters()
            }}
          >
            <Icon name='Reset' className='w-4 h-4 fill-chalice'/>
          </button>

        </div>
        <div className='transactions-item-list flex flex-col flex-1 h-0 overflow-y-auto bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded'>
          {filteredTransactions.map(({ _id, title, date, amount, category, type, currency}) => (
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
              setEditFormData={setEditFormData}
            />
          ))}
        </div>
      </div>
      {editForm && editFormData &&
        <Form setShowForm={setEditForm} initialData={editFormData} edit={true}/>
      }
    </>
  );
};

export default Transactions;
