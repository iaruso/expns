import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Income from '../../components/icons/Income';
import Expense from '../../components/icons/Expense';
import Investment from '../../components/icons/Investment';
import Food from '../../components/icons/Food';

const Dashboard = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className='flex gap-4 items-center w-full sm-mobile:!grid-cols-1 mobile:grid mobile:grid-cols-2'>
        <div data-title={t('app.dashboard.balance.description')} className='dashboard-card balance-card w-full flex flex-col flex-1 gap-2 p-4 rounded-lg bg-royal border-[0.05rem] mobile:border-[0.1rem] border-persian cursor-default'>
          <h2 className='text-white text-tiny font-semibold'>{t('app.dashboard.balance.title')}</h2>
          <span className='text-white text-base font-bold tabular-nums'>$ 1.999,99</span>
        </div>
        <div data-title={t('app.dashboard.incomes.description')} className='dashboard-card w-full flex flex-1 gap-2 p-4 rounded-lg items-center justify-between bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery cursor-default'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-cod text-tiny font-semibold'>{t('app.dashboard.incomes.title')}</h2>
            <span className='text-cod text-base font-bold tabular-nums'>$ 1.999,99</span>
          </div>
          <Income className='w-8 h-8 fill-cod'/>
        </div>
        <div data-title={t('app.dashboard.expenses.description')} className='dashboard-card w-full flex flex-1 gap-2 p-4 rounded-lg items-center justify-between bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery cursor-default'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-cod text-tiny font-semibold'>{t('app.dashboard.expenses.title')}</h2>
            <span className='text-cod text-base font-bold tabular-nums'>$ 1.999,99</span>
          </div>
          <Expense className='w-8 h-8 fill-cod'/>
        </div>
        <div data-title={t('app.dashboard.investments.description')} className='dashboard-card w-full flex flex-1 gap-2 p-4 rounded-lg items-center justify-between bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery cursor-default'>
          <div className='flex flex-col gap-2'>
            <h2 className='text-cod text-tiny font-semibold'>{t('app.dashboard.investments.title')}</h2>
            <span className='text-cod text-base font-bold tabular-nums'>$ 1.999,99</span>
          </div>
          <Investment className='w-8 h-8 fill-cod'/>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center justify-between h-6'>
          <h2 className='font-bold text-cod text-tiny'>{t('app.dashboard.transactions.title')}</h2>
          <div className='flex items-center h-6 gap-1'>
            <Link to='/app/transactions' className='h-6 flex px-2 py-1 text-sm font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.transactions.see_all')}
            </Link>
          </div>
        </div>
        <div className='transactions-item-list flex flex-col flex-1 overflow-y-auto bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery rounded'>
          {/* As template for now, save here transaction id too */}
          <div className='h-8 w-full flex items-center gap-1 py-1 px-2 hover:bg-alabaster hover:duration-[0.4s] ease-in-out cursor-pointer'>
            <Food className='w-4 h-4 fill-chalice'/>
            <span className='text-sm text-cod font-medium flex-1'>PizzaHut</span>
            <span className='text-sm text-gray font-medium'>(24-04-2024)</span>
            <span className='text-sm text-cod font-medium w-16 text-end tabular-nums'>$ 29,99</span>
            <Expense className='w-4 h-4 fill-chalice mt-[1px]'/>
          </div>
          <div className='h-8 w-full flex items-center gap-1 py-1 px-2 hover:bg-alabaster hover:duration-[0.4s] ease-in-out cursor-pointer'>
            <Food className='w-4 h-4 fill-chalice'/>
            <span className='text-sm text-cod font-medium flex-1'>PizzaHut</span>
            <span className='text-sm text-gray font-medium'>(24-04-2024)</span>
            <span className='text-sm text-cod font-medium w-16 text-end tabular-nums'>$ 1.007,99</span>
            <Expense className='w-4 h-4 fill-chalice mt-[1px]'/>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2 p-4 rounded-lg bg-white border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
        <div className='flex items-center justify-between h-6'>
          <h2 className='font-bold text-cod text-tiny'>{t('app.dashboard.categories.title')}</h2>
          <div className='flex items-center h-6 gap-1'>
            <button className='h-6 flex px-2 py-1 text-sm font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.categories.type.all')}
            </button>
            <button className='h-6 flex px-2 py-1 text-sm font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.categories.type.incomes')}
            </button>
            <button className='h-6 flex px-2 py-1 text-sm font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.categories.type.expenses')}
            </button>
            <button className='h-6 flex px-2 py-1 text-sm font-semibold text-gray items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery bg-white hover:bg-alabaster hover:duration-[0.4s] ease-in-out'>
              {t('app.dashboard.categories.type.investments')}
            </button>
          </div>
        </div>
        <div className='flex gap-2 items-center overflow-y-auto'>
          {/* As template for now */}
          <div className='h-32 w-32 rounded bg-royal flex flex-col justify-between p-4'>
            <Food className='w-8 h-8 fill-white'/>
            <div className='flex flex-col gap-2'>
              <h3 className='text-white text-tiny font-semibold'>Food</h3>
              <span className='text-white text-base font-bold tabular-nums'>$ 1.999,99</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
