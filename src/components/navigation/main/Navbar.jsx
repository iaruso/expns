import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { Link } from 'react-router-dom';
import Icon from '../../app/Icon.jsx';

const Navbar = () => {
	const { t } = useTranslation();
	const [offset, setOffset] = useState(-3 * parseFloat(getComputedStyle(document.documentElement).fontSize));
	useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 678) {
        setOffset(-4 * parseFloat(getComputedStyle(document.documentElement).fontSize));
      } else {
        setOffset(-2 * parseFloat(getComputedStyle(document.documentElement).fontSize));
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
	return (
		<nav className='w-full flex items-center justify-between h-12 py-2 border-b-[0.05rem] mobile:border-b-[0.1rem] border-gallery sticky top-0 bg-white px-8 md:px-32 xl:px-40 exl:px-48 z-50 mobile:h-16'>
			<div className='flex items-center gap-4'>
				<ScrollLink href='#intro-section' to='intro-section' offset={offset} spy={true} smooth={true} duration={400} className='flex items-center gap-1 cursor-pointer'>
					<Icon name='Logo' className='w-3 h-3 mobile:h-6 mobile:w-6'/>
					<span className='text-sm mobile:text-[1.25rem] font-extrabold text-persian'>Expns</span>
				</ScrollLink>
				<div className='hidden items-center gap-1 h6 md:flex'>
					<ScrollLink href='#features-section' to='features-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-[0.4s] ease-in-out cursor-pointer'>{t('navbar.main.features')}</ScrollLink>
					<ScrollLink href='#pricing-section' to='pricing-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-[0.4s] ease-in-out cursor-pointer'>{t('navbar.main.pricing')}</ScrollLink>
					<ScrollLink href='#about-section' to='about-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-[0.4s] ease-in-out cursor-pointer'>{t('navbar.main.about')}</ScrollLink>
				</div>
			</div>
			<div className='flex items-center gap-1 mobile:gap-2 h6 mobile:h-10'>
				<Link to='/login' className='h-6 mobile:h-10 px-2 py-1 mobile:px-4 mobile:py-2 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster text-cod text-xs mobile:text-base font-semibold duration-[0.4s] ease-in-out'>{t('navbar.main.login')}</Link>
				<Link to='/register' className='mobile:hidden md:flex h-6 px-2 py-1 flex items-center justify-center rounded bg-royal hover:bg-persian text-white text-xs font-semibold duration-[0.4s] ease-in-out'>{t('navbar.main.register')}</Link>
				<Link to='/register' className='mobile:flex md:hidden h-10 px-4 py-2 items-center justify-center rounded bg-royal hover:bg-persian text-white text-base font-semibold duration-[0.4s] ease-in-out'>{t('navbar.main.register_mobile')}</Link>
			</div>
		</nav>
	)
}	

export default Navbar;