import './Auth.css';
import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { gsap } from 'gsap';
import { useNotifications } from '../../components/notification/NotificationContainer';
import Logo from '../../components/icons/Logo';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const addNotification = useNotifications();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [passwordLevel, setPasswordLevel] = useState(0);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSymbol, setHasSymbol] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasLength, setHasLength] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const authRef = useRef(null);

  useEffect(() => {
    const expiryTime = localStorage.getItem('expiryTime');
    const currentTime = new Date().getTime();
    if (currentTime < parseInt(expiryTime) && expiryTime) {
      navigate('/app/');
    } else {
      gsap.fromTo(authRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!checked) {
      addNotification('error', 'Info', t('auth.register.reqs.terms'));
      return;
    }

    if (isRegistering) {
      return;
    }

    setIsRegistering(true);
  
    if (passwordLevel < 4) {
      addNotification('error', 'Info', t('auth.register.reqs.min'));
      setIsRegistering(false);
      return;
    }

    try {
      const response = await axios.post('https://expns-api.vercel.app/api/auth/register', {
        email,
        password
      });
  
      if (response.status === 201) {
        addNotification('success', 'Check', t('auth.register.reqs.succeeded'));
        setTimeout(() => {
          setIsRegistering(false);
          navigate('/login');
        }, 1000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        addNotification('error', 'Info', t('auth.register.reqs.duplicated'));
        setTimeout(() => {
          setIsRegistering(false);
        }, 1000);
      } else {
        addNotification('error', 'Info', t('auth.register.reqs.failed'));
        setTimeout(() => {
          setIsRegistering(false);
        }, 1000);
      }
    }
  };

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

  return (
    <div className='w-full h-[100dvh] flex items-center justify-center px-16'>
      <div className='w-64 p-4 gap-4 flex flex-col mobile:w-full mobile:gap-6' ref={authRef}>
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
              <span key={index} className={`w-1/4 rounded-sm duration-[0.4s] ease-in-out ${index > passwordLevel ? 'bg-alabaster' : 'bg-royal'}`}></span>
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
      </div>
    </div>
  );
};

export default Register;
