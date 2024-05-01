import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-dropdown-select';
import DatePicker from 'react-date-picker';
import jsonData from '../../../public/data.json';
import Return from '../icons/Return';
import Euro from '../icons/Euro';
import Dollar from '../icons/Dollar';
import Pound from '../icons/Pound';

const Form = ({ setShowForm }) => {
  const { t, i18n } = useTranslation();
	const [date, setDate] = useState(new Date());
  const [locale, setLocale] = useState(i18n.language);
	const currency = localStorage.getItem('currency') || 'usd';

	const [transactionAmount, setTransactionAmount] = useState('');

  const handleChange = (e) => {
    const input = e.target.value;
    // Regex to allow numbers and up to two decimal places
    const re = /^\d{0,10}(\.\d{0,2})?$/;
    if (re.test(input) || input === '') {
      setTransactionAmount(input);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

	const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');

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
    setSelectedType(selectedOptions[0]?.value || 'all');
    setSelectedCategory('');
  };

  useEffect(() => {
    console.log(filteredCategories);
  }, [selectedType, selectedCategory]);

	useEffect(() => {
		const formattedDate = date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' }); // Send always in this format to API
    console.log(formattedDate);
	}, [date]);

  return (
    <>
      <div className='fixed w-full h-full z-50 bg-white inset-0 flex items-center justify-center'>
        <form className='flex flex-col w-64 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
          <div className='h-8 gap-2 flex items-center'>
						<button className='w-8 h-8 rounded flex items-center justify-center bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster hover:duration-[0.4s]' onClick={handleCloseForm}>
							<Return className='w-4 h-4 fill-chalice'/>
						</button>
						<input type='text' placeholder={t('app.form.name')} className='h-8 flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'/>
					</div>
					<div className='form-selectors h-8 gap-2 flex items-center w-full'>
						<Select
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
						/>
						<Select
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
						/>
					</div>
					<div className='h-8 grid grid-cols-2 gap-2 items-center'>
						<DatePicker onChange={setDate} value={date} locale={locale}
							className={`h-8 w-full p-0 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out`}/>
						<div className='h-8 relative w-full'>
							<input type='text' placeholder={t('app.form.amount')} value={transactionAmount} onChange={handleChange} className='h-8 w-full flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'/>
							{ currency === 'usd' && <Dollar className='w-4 h-4 fill-chalice absolute right-2 top-2'/> } 
							{ currency === 'eur' && <Euro className='w-4 h-4 fill-chalice absolute right-2 top-2'/> } 
							{ currency === 'gbp' && <Pound className='w-4 h-4 fill-chalice absolute right-2 top-2'/> }
							</div>
					</div>
					<div className='h-8 gap-2 flex items-center'>
						<input type='text' placeholder={t('app.form.description')} className='h-8 flex-1 px-2 py-1 text-sm font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-white placeholder:text-alto hover:bg-alabaster hover:duration-[0.4s] ease-in-out'/>
					</div>
					<button type='submit' className='h-8 flex items-center justify-center rounded bg-royal text-white hover:bg-persian hover:duration-[0.4s] ease-in-out text-sm font-semibold'>
						{t('app.form.create')}
					</button>
          {/* You can add form fields and other content here */}
        </form>
      </div>
    </>
  );
};

export default Form;
