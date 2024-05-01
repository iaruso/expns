import React, { forwardRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dropdown = forwardRef(({setOpenDropdown}, ref) => {
  const { t, i18n } = useTranslation();
  const [languageBool, setLanguageBool] = useState(null);
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'usd');
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    setOpenDropdown(false);
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
      console.log('Error:', error);
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
    <div ref={ref} className='flex flex-col absolute top-14 right-[-0.55rem] mobile:right-0 w-fit min-w-24 p-2 rounded bg-white border-gallery border-[0.05rem] mobile:border-[0.1rem] mobile:top-16'>
      <ul className='flex flex-col w-auto gap-2'>
        <li className='rounded w-full h-6 mobile:h-8 flex items-center bg-sand'>
          <button 
            className={`rounded w-12 ${languageBool ? 'text-cod hover:bg-alabaster hover:duration-[0.4s] ease-in-out' : 'text-white bg-royal pointer-events-none'} h-6 mobile:h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            PT
          </button>
          <button 
            className={`rounded w-12 ${languageBool ? 'text-white bg-royal pointer-events-none' : 'text-cod hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-6 mobile:h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={toggleLanguage}
          >
            EN
          </button>
        </li>
        <li className='rounded w-full h-6 mobile:h-8 flex items-center bg-sand'>
          <button 
            className={`rounded w-8 ${currency === 'usd' ? 'text-white bg-royal pointer-events-none' : 'text-cod hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-6 mobile:h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('usd')}
          >
            USD
          </button>
          <button 
            className={`rounded w-8 ${currency === 'eur' ? 'text-white bg-royal pointer-events-none' : 'text-cod hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-6 mobile:h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('eur')}
          >
            EUR
          </button>
          <button 
            className={`rounded w-8 ${currency === 'gbp' ? 'text-white bg-royal pointer-events-none' : 'text-cod hover:bg-alabaster hover:duration-[0.4s] ease-in-out'} h-6 mobile:h-8 text-xs font-semibold mobile:text-sm flex items-center justify-center`} 
            onClick={() => toggleCurrency('gbp')}
          >
            GBP
          </button>
        </li>
        <li className='group rounded w-full hover:bg-red-50 h-6 mobile:h-8 px-2 py-1 flex items-center hover:duration-[0.4s] ease-in-out cursor-pointer' onClick={handleLogout}>
          <span className='w-full text-cod group-hover:text-red-600  hover:duration-[0.4s] ease-in-out text-xs font-semibold mobile:text-tiny mobile:text-end'>{t('navbar.app.logout')}</span>
        </li>
      </ul>
    </div>
  );
});

export default Dropdown;
