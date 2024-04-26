import './Auth.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import axios from 'axios';
import { gsap } from 'gsap';
import Logo from '../../components/icons/Logo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [hasWrong, setHasWrong] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isLogging, setIsLogging] = useState(false)
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
        setHasSucceeded(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
        }, 1000);
        setTimeout(() => {
          setIsLogging(false);
          navigate('/app/');
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setHasWrong(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
          setIsLogging(false);
        }, 1000);
      } else {
        setHasFailed(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
          setIsLogging(false);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (warning) {
      animateCard()
    }
  }, [warning]);

  useEffect(() => {
    setHasWrong(false);
    setHasFailed(false);
    setHasSucceeded(false);
  }, [email, password]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Helmet>
      <div className='w-full h-[100dvh] flex items-center justify-center px-16 mobile:px-12'>
        <div className='w-64 p-4 gap-4 flex flex-col mobile:w-full mobile:gap-6'>
          <Link to='/' className='flex gap-1 justify-center items-center mx-auto h-8 mobile:h-16 mobile:gap-2'>
            <Logo className='w-4 mobile:w-10'/>
            <span className='text-tiny font-extrabold text-persian mobile:text-[2rem]'>Expns</span>
          </Link>
          <form onSubmit={handleLogin} className='flex flex-col gap-2 mobile:gap-4'>
            <input type='email' placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} 
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto hover:duration-[0.4s] ease-in-out'/>
            <input type='password' placeholder={t('auth.password')} value={password} onChange={(e) => setPassword(e.target.value)} 
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
          {warning ?
              <>
              { !email || !password || !emailRegex.test(email) ?
                <div className='warning-card fixed bottom-4 min-h-8 bg-white w-56 rounded border-gallery border-[0.05rem] mobile:border-[0.1rem] p-4 gap-2 hover:duration-[0.4s] ease-in-out cursor-pointer hover:bg-sand opacity-0' onClick={() => setWarning(false)}>
                  <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.login.reqs.warning')}</p>
                </div>
              :
              <>
                { hasFailed || hasWrong || hasSucceeded ?
                  <div className='warning-card fixed bottom-4 min-h-8 bg-white w-56 rounded border-gallery border-[0.05rem] mobile:border-[0.1rem] p-4 gap-2 hover:duration-[0.4s] ease-in-out cursor-pointer hover:bg-sand opacity-0' onClick={() => setWarning(false)}>
                    { hasFailed ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.login.reqs.failed')}</p> : null }
                    { hasWrong ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.login.reqs.wrong')}</p> : null }
                    { hasSucceeded ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.login.reqs.succeeded')}</p> : null }
                  </div>
                : null}
              </>
              }
              </>
              : null
            }
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Login;
