import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-dropdown-select';
import jsonData from '../../../public/data.json';
import Filter from '../../components/icons/Filter';
import Reset from '../../components/icons/Reset';
import Food from '../../components/icons/Food';
import Expense from '../../components/icons/Expense';
import Ascending from '../../components/icons/Ascending';
import Descending from '../../components/icons/Descending';

const Transactions = () => {
  const { t } = useTranslation();

  const [selectedType, setSelectedType] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

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

  const options = [
    {
      value: 'sort_val_asc',
      label: (<span><Ascending/> {t('app.transactions.sort.sort_val')}</span>)
    },
    {
      value: 'sort_val_desc',
      label: (<span><Descending/> {t('app.transactions.sort.sort_val')}</span>)
    },
    {
      value: 'sort_date_asc',
      label: (<span><Ascending/> {t('app.transactions.sort.sort_date')}</span>)
    },
    {
      value: 'sort_date_desc',
      label: (<span><Descending/> {t('app.transactions.sort.sort_date')}</span>)
    },
    {
      value: 'sort_name_asc',
      label: (<span><Ascending/> {t('app.transactions.sort.sort_name')}</span>)
    },
    {
      value: 'sort_name_desc',
      label: (<span><Descending/> {t('app.transactions.sort.sort_name')}</span>)
    }
  ];

  return (
    <div className='flex flex-col h-full gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
      <div className='flex items-center h-8 gap-1'>
        <Select
          options={[
            { value: 'all', label: t('types.all') },
            { value: 'incomes', label: t('types.incomes') },
            { value: 'expenses', label: t('types.expenses') },
            { value: 'investments', label: t('types.investments') }
          ]}
          onChange={handleTypeChange}
          placeholder={t('app.transactions.type')}
          values={[selectedType]}
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
        <input type='text' placeholder={t('app.transactions.search')} className='h-8 flex-1 px-2 py-1 text-sm font-semibold text-gray border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded bg-alabaster'/>
        <Select
          options={options}
          onChange={(selectedOptions) => setSelectedSort(selectedOptions[0]?.value || '')}
          placeholder={t('app.transactions.sort.placeholder')}
          value={options.find(option => option.value === selectedSort)}
        />
        <button className='h-8 w-8 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-gallery hover:duration-[0.4s] ease-in-out'>
          <Filter className='w-4 h-4 fill-chalice'/>
        </button>
        <button className='h-8 w-8 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-gallery hover:duration-[0.4s] ease-in-out'>
          <Reset className='w-4 h-4 fill-chalice'/>
        </button>
      </div>
      <div className='transactions-item-list flex flex-col flex-1 h-0 overflow-y-auto bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded'>
        {/* As template for now, save here transaction id too */}
        <div className='h-8 w-full flex items-center gap-1 py-1 px-4 hover:bg-alabaster hover:duration-[0.4s] ease-in-out cursor-pointer'>
          <Food className='w-4 h-4 fill-chalice'/>
          <span className='text-sm text-cod font-medium flex-1'>PizzaHut</span>
          <span className='text-sm text-gray font-medium'>(24-04-2024)</span>
          <span className='text-sm text-cod font-medium w-16 text-end tabular-nums'>$ 29,99</span>
          <Expense className='w-4 h-4 fill-chalice mt-[1px]'/>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
