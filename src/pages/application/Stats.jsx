import React from 'react';
import { useTranslation } from 'react-i18next';

const Stats = () => {
  const { t } = useTranslation();
  return (
    <div className='flex flex-col flex-1 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center justify-between h-6'>
          <h2 className='font-bold text-cod text-tiny'>{t('app.stats.title')}</h2>
          <div className='flex items-center h-6 gap-1'>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.type.all')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.type.incomes')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.type.expenses')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.type.investments')}
            </button>
          </div>
        </div>
        <div className='transactions-item-list flex flex-col flex-1 overflow-y-auto bg-alabaster rounded relative'>
          <div className='absolute right-2 top-2 h-8 bg-white rounded flex items-center p-1 gap-1'>
          <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.time.day')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.time.week')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.time.month')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.time.year')}
            </button>
            <button className='h-6 flex px-2 py-1 text-xs font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.stats.time.custom')}
            </button>
          </div>
          {/* Add graph here */}
        </div>
      </div>
  );
};

export default Stats;
