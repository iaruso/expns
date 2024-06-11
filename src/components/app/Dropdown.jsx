import React, { forwardRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../notification/NotificationContainer.jsx';
import axios from 'axios';
import Icon from '../icons/Icon.jsx';

const Dropdown = forwardRef(() => {
  const { t, i18n } = useTranslation();
  const addNotification = useNotifications();
  const [languageBool, setLanguageBool] = useState(null);
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'usd');
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      const response = await axios.delete('https://expns-api.vercel.app/api/tokens/', {
        data: { refreshToken: refreshToken }
      });
      if (response.status === 200) {
        addNotification('success', 'Check', t('navbar.app.logout_message'));
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiryTime');
        localStorage.removeItem('currency');
        localStorage.removeItem('data-loaded');
        navigate('/login');
      }
    } catch (error) {
      
    }
  };
	
	useEffect(() => {
		i18n.language === 'en' ? setLanguageBool(true) : setLanguageBool(false);
	}, [i18n]);
  const toggleLanguage = () => {
    setLanguageBool(prevState => !prevState);
    !languageBool ? i18n.changeLanguage('en') : i18n.changeLanguage('pt');
    window.location.reload();
  };

  const toggleCurrency = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    localStorage.setItem('currency', selectedCurrency);
    window.location.reload();
  };
  
  return (
    <>
      <ul className='flex flex-col w-auto gap-2'>
        <li className='rounded w-full h-8 mobile:h-10 flex items-center bg-sand'>
          <button 
            className={`rounded w-12 mobile:w-[50%] ${languageBool ? 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out' : 'text-white bg-royal pointer-events-none'} h-8 mobile:h-10 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            PT
          </button>
          <button 
            className={`rounded w-12 mobile:w-[50%] ${languageBool ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 mobile:h-10 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            EN
          </button>
        </li>
        <li className='rounded w-full h-8 flex items-center bg-sand'>
          <button 
            className={`rounded w-8 mobile:w-10 ${currency === 'usd' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 mobile:h-10 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('usd')}
          >
            USD
          </button>
          <button 
            className={`rounded w-8 mobile:w-10 ${currency === 'eur' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 mobile:h-10 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('eur')}
          >
            EUR
          </button>
          <button 
            className={`rounded w-8 mobile:w-10 ${currency === 'gbp' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 mobile:h-10 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('gbp')}
          >
            GBP
          </button>
        </li>
        <li className='group rounded w-full hover:bg-red-50 mobile:bg-red-50 h-8 mobile:h-10 px-2 py-1 flex items-center justify-between hover:duration-[0.4s] ease-in-out cursor-pointer' onClick={handleLogout}>
          <span className='w-full text-red-600 hover:duration-[0.4s] ease-in-out text-xs font-semibold mobile:text-tiny'>{t('navbar.app.logout')}</span>
          <Icon name='Logout' className='w-4 h-4 fill-red-600'/>
        </li>
      </ul>
    </>
  );
});

export default Dropdown;
