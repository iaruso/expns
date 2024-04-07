import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Logo from '../../components/icons/Logo';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleResetPassword = (e) => {
    e.preventDefault();
    console.log('Resetting password for:', email);
    navigate('/');
  };

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      <div className='w-full h-[100dvh] flex items-center justify-center px-16'>
        <div className='w-64 p-4 gap-4 flex flex-col mobile:w-full mobile:gap-6'>
          <Link to='/' className='flex gap-1 justify-center items-center mx-auto h-8 mobile:h-16 mobile:gap-2'>
            <Logo className='w-4 mobile:w-10'/>
            <span className='text-tiny font-extrabold text-persian mobile:text-[2rem]'>Expns</span>
          </Link>
          <form onSubmit={handleResetPassword} className='flex flex-col gap-2 mobile:gap-4'>
            <input type='email' placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} 
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto duration-200'/>
            <span className='text-xs mobile:text-base font-semibold text-gray'>{t('auth.reset.message_before')}</span>
            <button type='submit' className='h-8 mobile:h-12 rounded px-2 py-1 bg-royal hover:bg-persian duration-200 text-white text-sm mobile:text-[1.25rem] font-semibold'>{t('auth.reset.cta')}</button>
          </form>
          <Link to='/login' className='text-xs mobile:text-base font-semibold flex gap-1 w-full justify-center text-cod hover:underline'>{t('auth.reset.alt_opt')}</Link>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ResetPassword;
