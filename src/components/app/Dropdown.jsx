import React, { forwardRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Icon from './Icon';

const Dropdown = forwardRef(() => {
  const { t, i18n } = useTranslation();
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
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('expiryTime');
        navigate('/login');
      }
    } catch (error) {
      
    }
  };
	
	useEffect(() => {
		i18n.language === 'en-US' ? setLanguageBool(true) : setLanguageBool(false);
	}, [i18n]);
  const toggleLanguage = () => {
    setLanguageBool(prevState => !prevState);
    !languageBool ? i18n.changeLanguage('en-US') : i18n.changeLanguage('pt-PT');
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
        <li className='rounded w-full h-8 flex items-center bg-sand'>
          <button 
            className={`rounded w-12 ${languageBool ? 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out' : 'text-white bg-royal pointer-events-none'} h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            PT
          </button>
          <button 
            className={`rounded w-12 ${languageBool ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            EN
          </button>
        </li>
        <li className='rounded w-full h-8 flex items-center bg-sand'>
          <button 
            className={`rounded w-8 ${currency === 'usd' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('usd')}
          >
            USD
          </button>
          <button 
            className={`rounded w-8 ${currency === 'eur' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('eur')}
          >
            EUR
          </button>
          <button 
            className={`rounded w-8 ${currency === 'gbp' ? 'text-white bg-royal pointer-events-none' : 'text-gray hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('gbp')}
          >
            GBP
          </button>
        </li>
        <li className='group rounded w-full hover:bg-red-50 h-8 mobile:h-8 px-2 py-1 flex items-center hover:duration-[0.4s] ease-in-out cursor-pointer' onClick={handleLogout}>
          <span className='w-full text-red-600 hover:duration-[0.4s] ease-in-out text-xs font-semibold mobile:text-tiny mobile:text-end'>{t('navbar.app.logout')}</span>
          <Icon name='Logout' className='w-4 h-4 fill-red-600'/>
        </li>
      </ul>
    </>
  );
});

export default Dropdown;
