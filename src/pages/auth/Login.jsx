import './Auth.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { gsap } from 'gsap';
import Logo from '../../components/icons/Logo';
import { useNotifications } from '../../components/notification/NotificationContainer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isLogging, setIsLogging] = useState(false)
  const addNotification = useNotifications();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const animateCard = () => {
    gsap.fromTo(
      '.warning-card',
      { opacity: 0 },
      {
        opacity: 1,
        duration: 0.6,
        delay: 0.4,
        ease: 'power1.inOut',
      }
    )
  };

  useEffect(() => {
    const expiryTime = localStorage.getItem('expiryTime');
    const currentTime = new Date().getTime();
    if (currentTime < parseInt(expiryTime) && expiryTime) {
      navigate('/app/');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (isLogging) {
      return;
    }
    setIsLogging(true);
  
    try {
      const response = await axios.post('https://expns-api.vercel.app/api/auth/login', {
        email,
        password
      });
  
      if (response.status === 200) {
        const { userId, accessToken, refreshToken } = response.data;
        localStorage.setItem('userId', userId);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('email', email);
      if (checked) {
        const expiryTime = new Date().getTime() + 60 * 60 * 1000;
        localStorage.setItem('expiryTime', expiryTime);
      } else {
        const expiryTime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem('expiryTime', expiryTime);
      }
        addNotification('success', 'Check', t('auth.login.reqs.succeeded'));
        setIsLogging(false);
        navigate('/app/');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        addNotification('error', 'Info', t('auth.login.reqs.wrong'));
        setIsLogging(false);
      } else {
        addNotification('error', 'Info', t('auth.login.reqs.failed'));
        setIsLogging(false);
      }
    }
  };

  useEffect(() => {
    if (warning) {
      animateCard()
    }
  }, [warning]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <>
      <div className='w-full h-[100dvh] flex items-center justify-center px-16'>
        <div className='w-64 p-4 gap-4 flex flex-col mobile:w-full mobile:gap-6'>
          <Link to='/' className='flex gap-1 justify-center items-center mx-auto h-8 mobile:h-16 mobile:gap-2'>
            <Logo className='w-4 mobile:w-10'/>
            <span className='text-tiny font-extrabold text-persian mobile:text-[2rem]'>Expns</span>
          </Link>
          <form onSubmit={handleLogin} className='flex flex-col gap-2 mobile:gap-4'>
            <input type='email' placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off'
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto hover:duration-[0.4s] ease-in-out'/>
            <input type='password' placeholder={t('auth.password')} value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off'
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto hover:duration-[0.4s] ease-in-out'/>
            <div className='flex gap-2 justify-between items-center mobile:gap-4'>
              <label className='checkbox-container text-xs mobile:text-base font-semibold text-gray hover:text-shaft'>{t('auth.login.remember')}
                <input type='checkbox' onChange={(e) => setChecked(e.target.value)}/>
                <span className='checkmark'></span>
              </label>
              <Link to='/reset-password' className='text-xs mobile:text-base font-semibold text-gray hover:text-shaft'>{t('auth.login.forgot')}</Link>
            </div>
            <button type='submit' className='h-8 mobile:h-12 rounded px-2 py-1 bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out text-white text-sm mobile:text-[1.25rem] font-semibold'>{t('auth.login.cta')}</button>
          </form>
          <p className='text-gray text-xs mobile:text-base font-semibold flex gap-1 w-full justify-center'>{t('auth.login.alt')}<Link to='/register' className='text-cod hover:underline'>{t('auth.login.alt_opt')}</Link></p>
        </div>
      </div>
    </>
  );
};

export default Login;
