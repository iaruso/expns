import './Dropdown.css';
import React, { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dropdown = forwardRef(({setOpenDropdown}, ref) => {
  const { t } = useTranslation();
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
  return (
    <div ref={ref} className='flex flex-col dropDownProfile'>
      <ul className='flex flex-col'>
        <li className='rounded hover:bg-alabaster h-8 px-2 py-1 flex items-center text-cod text-sm font-semibold hover:duration-200 cursor-pointer'>{t('navbar.app.options.settings')}</li>
        <li className='rounded hover:bg-alabaster h-8 px-2 py-1 flex items-center text-cod text-sm font-semibold hover:duration-200 cursor-pointer' onClick={handleLogout}>{t('navbar.app.options.logout')}</li>
      </ul>
    </div>
  );
});

export default Dropdown;
