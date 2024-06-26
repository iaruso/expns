import './Application.css';
import React, { createContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { gsap } from 'gsap';
import Dashboard from './Dashboard';
import Stats from './Stats';
import Transactions from './Transactions';
import Navbar from '../../components/navigation/app/Navbar';
import { useNotifications } from '../../components/notification/NotificationContainer';

const FetchContext = createContext();
const TransactionsContext = createContext();
const CurrencyContext = createContext();

const Application = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const addNotification = useNotifications();
  const [userTransactions, setUserTransactions] = useState([]);
  const [currencyRates, setCurrencyRates] = useState({});
  const [triggerFetch, setTriggerFetch] = useState(0); // 0 - Load data, 1 - Reload data, 2 - Do nothing
  const [dataLoaded, setDataLoaded] = useState(false);
  const dataLoadedFromStorage = localStorage.getItem('data-loaded') || false;

  useEffect(() => {
    const expiryTime = localStorage.getItem('expiryTime');
    if (!expiryTime) {
      navigate('/login');
    }
    const currentTime = new Date().getTime();
    if (currentTime > parseInt(expiryTime)) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchUserData = async () => {
    if (triggerFetch === 2) {
      return;
    }
    try {
      const userId = localStorage.getItem('userId');
      const accessToken = localStorage.getItem('accessToken');
      if (!userId || !accessToken) {
        throw new Error('User ID or access token not found in local storage');
      }

      const transactionsPromise = axios.get('https://expns-api.vercel.app/api/get-transactions', {
        headers: {
          'user-id': userId,
          'x-access-token': accessToken
        }
      });
      
      const currencyRatesPromise = axios.get('https://expns-api.vercel.app/api/rates');

      const [transactionsResponse, currencyRatesResponse] = await Promise.all([transactionsPromise, currencyRatesPromise]);

      if (transactionsResponse.status === 204) {
        setUserTransactions([]);
      } else if (transactionsResponse.status === 200) {
        const transactions = transactionsResponse.data;
        setUserTransactions(transactions);
        const rates = currencyRatesResponse.data[0]?.rates || {};
        setCurrencyRates(rates);
        if (triggerFetch === 0 && !dataLoadedFromStorage) addNotification('success', 'Check', t('fetch.loaded'));
        setTriggerFetch(2);
        setDataLoaded(true);
        localStorage.setItem('data-loaded', true);
      } else {
        addNotification('error', 'Info', t('fetch.failed'));
      }
    } catch (error) {
      addNotification('error', 'Info', t('fetch.failed'));
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [triggerFetch]);

  useEffect(() => {
    if (dataLoaded) gsap.fromTo('.app-container', { opacity: 0 }, { opacity: 1, duration: 0.8 });
  }, [location, dataLoaded]);

  return (
    <>
      <FetchContext.Provider value={setTriggerFetch}>
        <TransactionsContext.Provider value={userTransactions}>
          <CurrencyContext.Provider value={currencyRates}>
            {dataLoaded &&
              <>
                <div className='application-container'>
                  <Navbar/>
                  <div className='app-container w-full relative flex flex-col md:px-[10vw] xl:px-[20vw] exl:px-[25vw] py-4 mobile:px-0 gap-4 items-center'>
                    <div className='w-full h-0 flex-1 overflow-hidden flex flex-col gap-4 mobile:px-4'>
                      <Routes>
                        <Route path='/' element={<Dashboard/>} />
                        <Route path='/stats' element={<Stats/>} />
                        <Route path='/transactions' element={<Transactions/>} />
                      </Routes>
                    </div>
                  </div>
                </div>
              </>
            }
          </CurrencyContext.Provider>
        </TransactionsContext.Provider>
      </FetchContext.Provider>
    </>
  );
};

export { TransactionsContext, CurrencyContext, FetchContext, Application as default };
