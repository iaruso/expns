import React, { useState, useEffect, useRef, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionsContext } from '../../pages/application/Application';
import axios from 'axios';
import Select from 'react-dropdown-select';
import DatePicker from 'react-date-picker';
import jsonData from '../../../public/data.json';
import Return from '../icons/Return';
import Delete from '../icons/Delete';
import Euro from '../icons/Euro';
import Dollar from '../icons/Dollar';
import Pound from '../icons/Pound';

const Form = ({ setShowForm, edit = false, initialData }) => {
  const { t, i18n } = useTranslation();
  const userTransactions = useContext(TransactionsContext);
  const [transactionDate, setTransactionDate] = useState(new Date());
  const [locale, setLocale] = useState(i18n.language);
  const currency = localStorage.getItem('currency') || 'usd';
  const transactionName = useRef(null);
  const transactionDescription = useRef(null);
  const [transactionAmount, setTransactionAmount] = useState('');
  const [selectedType, setSelectedType] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const typesOptions = [
    { value: 'incomes', label: t('types.incomes') },
    { value: 'expenses', label: t('types.expenses') },
    { value: 'investments', label: t('types.investments') }
  ];

  useEffect(() => {
    if (edit && initialData) {
      const transactionToUpdate = userTransactions.find(transaction => transaction._id === initialData.id);
      if (transactionToUpdate) {
        setTransactionDate(new Date(transactionToUpdate.date));
        setTransactionAmount(transactionToUpdate.amount.toString());
        //setSelectedType(transactionToUpdate.type);
        //setSelectedCategory(transactionToUpdate.category);
        transactionName.current.value = transactionToUpdate.title;
        transactionDescription.current.value = transactionToUpdate.description;
      }
    }
  }, [edit, initialData]);

  const handleChange = (e) => {
    const input = e.target.value;
    const re = /^\d{0,10}(\.\d{0,2})?$/;
    if (re.test(input) || input === '') {
      setTransactionAmount(input);
    }
  };

  const handleCloseForm = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  useEffect(() => {
    console.log('Selected Type:', selectedType);
  }, [selectedType]);

  const allCategories = Object.keys(jsonData.categories).reduce((acc, type) => {
    if (type !== 'total' && type !== 'other' && type !== 'all') {
      const typeCategories = Object.keys(jsonData.categories[type]).map(category => ({ type, category }));
      return [...acc, ...typeCategories];
    }
    return acc;
  }, []);

  const filteredCategories = selectedType
    ? Object.keys(jsonData.categories[selectedType] || {}).map(category => ({ type: selectedType, category }))
    : allCategories;

  const handleTypeChange = (val) => {
    setSelectedType(val[0]?.value);
  };

  useEffect(() => {
    const clearButton = document.querySelector('.category-select .react-dropdown-select-clear');
    if (clearButton) {
      clearButton.click();
    }
  }, [selectedType]);

  const handleCategoryChange = (val) => {
    setSelectedCategory(val[0]?.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formattedDate = `${transactionDate.getDate().toString().padStart(2, '0')}-${(transactionDate.getMonth() + 1).toString().padStart(2, '0')}-${transactionDate.getFullYear()}`;
    const amount = parseFloat(transactionAmount);
    const type = selectedType;
    const category = selectedCategory;
    const description = transactionDescription.current.value;
    const title = transactionName.current.value;
    
    const requestData = {
      title,
      currency: currency,
      type,
      amount,
      category,
      description,
      date: formattedDate 
    };
    
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
    
    const headers = {
      'Content-Type': 'application/json',
      'user-id': userId,
      'x-access-token': accessToken
    };
  
    try {
      if (edit) {
        const response = await axios.put(`https://expns-api.vercel.app/api/update-transaction/${initialData.id}`, requestData, { headers });
      } else {
        const response = await axios.post('https://expns-api.vercel.app/api/add-transaction', requestData, { headers });
      }
      handleCloseForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');
  
    const headers = {
      'Content-Type': 'application/json',
      'user-id': userId,
      'x-access-token': accessToken
    };
  
    try {
      const response = await axios.delete(`https://expns-api.vercel.app/api/delete-transaction/${initialData.id}`, { headers });
      handleCloseForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='fixed w-full h-full z-50 bg-white inset-0 flex items-center justify-center'>
        <form className='flex flex-col w-64 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery' onSubmit={handleSubmit}>
          <div className='h-8 gap-2 flex items-center'>
            <button className='w-8 h-8 rounded flex items-center justify-center bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster hover:duration-[0.4s]' onClick={handleCloseForm}>
              <Return className='w-4 h-4 fill-chalice'/>
            </button>
            <input type='text' ref={transactionName} required placeholder={t('app.form.name')} className={`h-8 w-0 flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] ${!edit ? 'border-gallery' : 'border-white focus:border-gallery hover:border-gallery'} rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out`}/>
            { edit &&
              <button className='w-8 h-8 rounded flex items-center justify-center bg-[#E95656] hover:bg-[#D93F3F] hover:duration-[0.4s]' onClick={handleDelete}>
                <Delete className='w-4 h-4 fill-white'/>
              </button>
            }
          </div>
          <div className='form-selectors h-8 gap-2 flex items-center w-full'>
            <Select
              className='type-select'
              options={typesOptions}
              onChange={handleTypeChange}
              placeholder={t('app.transactions.type')}
              values={selectedType}
              searchable={false}
              required
            />
            <Select
              className='category-select'
              disabled={selectedType.length === 0}
              options={[
                ...filteredCategories.map(category => ({
                  value: category.category,
                  label: t(jsonData.categories[category.type]?.[category.category]),
                })),
                { value: 'other', label: t('categories.other') }
              ].filter(option => option)}
              values={selectedCategory}
              onChange={handleCategoryChange}
              placeholder={t('app.transactions.category')}
              clearable
              searchable={false}
              required
            />
          </div>
          <div className='h-8 grid grid-cols-2 gap-2 items-center'>
            <DatePicker onChange={setTransactionDate} value={transactionDate} locale={locale} required
              className={`h-8 w-full p-0 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out`}/>
            <div className='h-8 relative w-full'>
              <input type='text' placeholder={t('app.form.amount')} value={transactionAmount} onChange={handleChange} className='h-8 w-full flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'/>
              { currency === 'usd' && <Dollar className='w-4 h-4 fill-chalice absolute right-2 top-2'/> } 
              { currency === 'eur' && <Euro className='w-4 h-4 fill-chalice absolute right-2 top-2'/> } 
              { currency === 'gbp' && <Pound className='w-4 h-4 fill-chalice absolute right-2 top-2'/> }
            </div>
          </div>
          <div className='h-8 gap-2 flex items-center'>
            <input type='text' ref={transactionDescription} placeholder={t('app.form.description')} className='h-8 flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'/>
          </div>
          <button type='submit' className='h-8 flex items-center justify-center rounded bg-royal text-white hover:bg-persian hover:duration-[0.4s] ease-in-out text-sm font-semibold'>
            {t('app.form.create')}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
