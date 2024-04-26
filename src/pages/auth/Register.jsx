import './Auth.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import axios from 'axios';
import { gsap } from 'gsap';
import Logo from '../../components/icons/Logo';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasSucceeded, setHasSucceeded] = useState(false);
  const [warning, setWarning] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false)
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      return;
    }
    setIsRegistering(true);
  
    if (passwordLevel < 4) {
      setWarning(true);
      return;
    }
  
    try {
      const response = await axios.post('https://expns-api.vercel.app/api/auth/register', {
        email,
        password
      });
  
      if (response.status === 201) {
        setHasSucceeded(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
        }, 1000);
        setTimeout(() => {
          setIsRegistering(false);
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setDuplicatedEmail(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
          setIsRegistering(false);
        }, 1000);
      } else {
        setHasFailed(true);
        !warning ? setWarning(true) : null;
        setTimeout(() => {
          animateCard();
          setIsRegistering(false);
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
    setDuplicatedEmail(false);
    setHasFailed(false);
    setHasSucceeded(false);
  }, [email, password, checked]);

  const checkPasswordStrength = (value) => {
    const hasNumber = /\d/.test(value);
    const hasSymbol = /[!@#$%^&*(),.?':{}|<>]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasLowercase = /[a-z]/.test(value);
    const hasMinLength = value.length >= 8;
  
    const level = [hasNumber, hasSymbol, hasUppercase, hasLowercase].filter(Boolean).length;
  
    setPasswordLevel(level * Math.min(value.length / 8, 1));
    setHasNumber(hasNumber);
    setHasSymbol(hasSymbol);
    setHasUppercase(hasUppercase);
    setHasLowercase(hasLowercase);
    setHasLength(hasMinLength);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordStrength(e.target.value);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <HelmetProvider>
      <Helmet>
        <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      </Helmet>
      <div className='w-full h-[100dvh] flex items-center justify-center px-16 mobile:px-12'>
        <div className='w-64 p-4 gap-4 flex flex-col mobile:w-full mobile:gap-6'>
          <Link to='/' className='flex gap-1 justify-center items-center mx-auto h-8 mobile:h-16 mobile:gap-2'>
            <Logo className='w-4 mobile:w-10'/>
            <span className='text-tiny font-extrabold text-persian mobile:text-[2rem]'>Expns</span>
          </Link>
          <form onSubmit={handleRegister} className='flex flex-col gap-2 mobile:gap-4'>
            <input type='email' placeholder={t('auth.email')} value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete='off'
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto hover:duration-[0.4s] ease-in-out'/>
            <input type='password' placeholder={t('auth.password')} value={password} onChange={handlePasswordChange} title={t('auth.register.reqs.title')} required autoComplete='off'
            className='h-8 mobile:h-12 rounded px-2 py-1 placeholder:text-alto text-xs mobile:text-base font-semibold text-cod border-[0.05rem] mobile:border-[0.1rem] border-gallery focus-within:bg-sand focus-within:border-alto hover:duration-[0.4s] ease-in-out'/>
            <div id='pwrd-security' className='flex h-1 gap-1'>
              {[1, 2, 3, 4].map((index) => (
                <span key={index} className={`w-1/4 rounded-sm duration-[0.4s] ease-in-out ${index > passwordLevel ? 'bg-gallery' : 'bg-royal'}`}></span>
              ))}
            </div>
            <div className='flex gap-2 justify-between items-center mobile:gap-4'>
              <label className='checkbox-container text-xs mobile:text-base font-semibold text-gray hover:text-shaft'>{t('auth.register.terms')}
                <input type='checkbox' required onChange={(e) => setChecked(e.target.value)}/>
                <span className='checkmark'></span>
              </label>
            </div>
            <button type='button' onClick={handleRegister} className='h-8 mobile:h-12 rounded px-2 py-1 bg-royal hover:bg-persian hover:duration-[0.4s] ease-in-out text-white text-sm mobile:text-[1.25rem] font-semibold'>
              {t('auth.register.cta')}
            </button>
          </form>
          <p className='text-gray text-xs mobile:text-base font-semibold flex gap-1 w-full justify-center'>{t('auth.register.alt')}<Link to='/login' className='text-cod hover:underline'>{t('auth.register.alt_opt')}</Link></p>
          {warning ?
            <>
            { !email || !password || !checked || !emailRegex.test(email) ?
              <div className='warning-card fixed bottom-4 min-h-8 bg-white w-56 rounded border-gallery border-[0.05rem] mobile:border-[0.1rem] p-4 gap-2 hover:duration-[0.4s] ease-in-out cursor-pointer hover:bg-sand opacity-0' onClick={() => setWarning(false)}>
                <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.warning')}</p>
              </div>
            :
            <>
              { !hasNumber || !hasSymbol || !hasUppercase || !hasLowercase || !hasLength ?
                <div className='warning-card fixed bottom-4 min-h-8 bg-white w-56 rounded border-gallery border-[0.05rem] mobile:border-[0.1rem] p-4 gap-2 hover:duration-[0.4s] ease-in-out cursor-pointer hover:bg-sand opacity-0' onClick={() => setWarning(false)}>
                  <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.password_warning')}</p>
                  <ul className='list-[initial] py-2 px-4 mobile:px-8 '>
                    { !hasNumber ? <li className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.number')}</li> : null }
                    { !hasSymbol ? <li className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.symbol')}</li> : null }
                    { !hasUppercase ? <li className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.uppercase')}</li> : null }
                    { !hasLowercase ? <li className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.lowercase')}</li> : null }
                    { !hasLength ? <li className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.length')}</li> : null }
                  </ul>
                </div>
                : null}
              { hasFailed || duplicatedEmail || hasSucceeded ?
                <div className='warning-card fixed bottom-4 min-h-8 bg-white w-56 rounded border-gallery border-[0.05rem] mobile:border-[0.1rem] p-4 gap-2 duration-[0.4s] ease-in-out cursor-pointer hover:bg-sand opacity-0' onClick={() => setWarning(false)}>
                  { hasFailed ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.failed')}</p> : null }
                  { duplicatedEmail ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.duplicated')}</p> : null }
                  { hasSucceeded ? <p className='text-gray text-xs mobile:text-base font-semibold'>{t('auth.register.reqs.succeeded')}</p> : null }
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

export default Register;
