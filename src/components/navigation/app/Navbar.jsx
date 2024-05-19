import React, { useState, useRef, useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from '../../app/Dropdown.jsx';
import Icon from '../../app/Icon.jsx';
import Form from '../../transactions/Form.jsx';

const Navbar = () => {
  console.log('Application');
  const { t } = useTranslation();
  const matchDashboard = useMatch('/app/');
  const matchStats = useMatch('/app/stats');
  const matchTransactions = useMatch('/app/transactions');

  const dropdownRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  const settingsRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !settingsRef.current.contains(event.target)
      ) {
        dropdownRef.current.style.display = 'none';
        settingsRef.current.classList.remove('active');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (e) => {
    if (dropdownRef.current.style.display === 'block') {
      dropdownRef.current.style.display = 'none';
      settingsRef.current.classList.remove('active');
    } else {
      dropdownRef.current.style.display = 'block';
      settingsRef.current.classList.add('active');
    }
    e.stopPropagation();
  };

  return (
    <>
      {!showForm && (
        <nav className='w-full flex items-center justify-between h-12 mobile:h-16 md:px-[10vw] xl:px-[20vw] exl:px-[25vw] py-2 mobile:px-4 gap-2 md:border-b-[0.05rem] mobile:border-t-[0.1rem] border-gallery bg-white'>
          <div className='flex items-center justify-start gap-4 w-5 h-5 mobile:w-6 mobile:h-6'>
            <Icon name='Logo' className='w-4 h-4 mobile:h-5 mobile:w-5' />
          </div>
          <div className='flex items-center gap-2 h-8 flex-1'>
            <Link to='/app/' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchDashboard ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.dashboard')}</Link>
            <Link to='/app/stats' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchStats ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.stats')}</Link>
            <Link to='/app/transactions' className={`h-8 mobile:h-10 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] ${matchTransactions ? 'bg-royal border-royal text-white' : 'border-gallery hover:bg-alabaster text-cod'} text-sm mobile:text-tiny font-semibold hover:duration-[0.4s] ease-in-out`}>{t('navbar.app.transactions')}</Link>
          </div>
          <div className='flex items-center gap-1 h-8 mobile:h-10'>
            <button type='button' className='h-8 px-2 mobile:h-10 mobile:w-10 flex items-center justify-center gap-1 rounded bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out' onClick={() => setShowForm(true)}>
              <Icon name='Add' className='w-4 h-4 mobile:h-5 mobile:w-5 fill-white' />
              <span className='mobile:hidden text-white text-xs font-semibold'>{t('navbar.app.add')}</span>
            </button>
          </div>
          <div className='flex items-center justify-center h-8 w-8 mobile:h-10 mobile:w-10 relative z-50'>
            <div className={`settings-button flex items-center justify-center h-8 w-8 mobile:h-10 mobile:w-10 cursor-pointer rounded bg-sand hover:bg-alabaster hover:duration-[0.4s]`} ref={settingsRef} onClick={toggleDropdown}>
              <Icon name='Settings' className='w-4 h-4 mobile:h-5 mobile:w-5 fill-chalice' />
            </div>
            <div ref={dropdownRef} style={{ display: 'none' }} className='flex flex-col absolute mobile:bottom-16 md:top-14 right-0 mobile:right-0 w-fit min-w-24 p-2 rounded bg-white border-gallery border-[0.05rem] mobile:border-[0.1rem]'>
              <Dropdown/>
            </div>
          </div>
        </nav>
      )}
      {showForm && <Form setShowForm={setShowForm} />}
    </>
  );
};

export default Navbar;
