import React, { useState, useRef, useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../app/Dropdown.jsx';
import Icon from '../../app/Icon.jsx';

import Form from '../../transactions/Form.jsx';

const Navbar = () => {
  const { t } = useTranslation();
  const matchDashboard = useMatch('/app/');
  const matchStats = useMatch('/app/stats');
  const matchTransactions = useMatch('/app/transactions');

  const dropdownRef = useRef(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !settingsRef.current.contains(event.target)
      ) {
        setOpenDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, settingsRef]);

  return (
    <>
      {!showForm && <nav className='w-full flex items-center justify-between h-12 exl:px-[20rem] xl:px-[12rem] lg:px-[10rem] md:px-[4rem] py-2 mobile:p-2 gap-2 md:border-b-[0.05rem] mobile:border-b-[0.1rem] border-gallery bg-white'>
        <div className='flex items-center justify-start gap-4 w-5 h-5 mobile:w-6 mobile:h-6'>
          <Icon name='Logo' className='w-5 h-5 mobile:h-6 mobile:w-6'/>
        </div>
        <div className='flex items-center gap-2 h-8 flex-1'>
          <Link to='/app/' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchDashboard ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.dashboard')}</Link>
          <Link to='/app/stats' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchStats ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.stats')}</Link>
          <Link to='/app/transactions' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchTransactions ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.transactions')}</Link>
        </div>
        <div className='flex items-center gap-1 h-8 mobile:h-10'>
          <button className='h-8 w-8 mobile:h-10 mobile:w-10 flex items-center justify-center rounded bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out' onClick={() => setShowForm(true)}> {/* Set showForm to true on button click */}
            <Icon name='Add' className='w-5 h-5 mobile:h-6 mobile:w-6 fill-white'/>
          </button>
        </div>
        <div className='flex items-center justify-center h-8 w-8 mobile:h-10 mobile:w-10 relative z-50'>
          <div className={`settings-button ${openDropdown ? 'active' : ''} flex items-center justify-center h-8 w-8 mobile:h-10 mobile:w-10 cursor-pointer rounded bg-sand hover:bg-alabaster hover:duration-[0.4s]`} ref={settingsRef} onClick={(e) => {
            setOpenDropdown((prev) => !prev);
            e.stopPropagation();
          }}>
            <Icon name='Settings' className='w-5 h-5 mobile:h-6 mobile:w-6 fill-chalice'/>
          </div>
          {openDropdown && <Dropdown setOpenDropdown={setOpenDropdown} ref={dropdownRef}/> }
        </div>
      </nav> }
      {showForm && <Form setShowForm={setShowForm} />}
    </>
  );
};

export default Navbar;
