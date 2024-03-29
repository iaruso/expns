import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo.jsx';
import Translator from '../../i18n/Translator.jsx';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

const Navbar = () => {
	return (
		<nav className='w-full flex items-center justify-between h-12 py-2 border-b-[0.05rem] mobile:border-b-[0.1rem] border-gallery sticky top-0 bg-white px-8 md:px-32 exl:px-64 z-50 mobile:h-16'>
			<div className='flex items-center gap-4'>
				<ScrollLink to='intro-section' offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} spy={true} smooth={true} duration={400} className='flex items-center gap-1 cursor-pointer'>
					<Logo className='w-3 h-3 mobile:h-6 mobile:w-6'/>
					<span className='text-sm mobile:text-[1.25rem] font-extrabold text-persian'>Expns</span>
				</ScrollLink>
				<div className='hidden items-center gap-1 h6 md:flex'>
					<ScrollLink to='features-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200 cursor-pointer'><Translator path='navbar.main.features'/></ScrollLink>
					<ScrollLink to='pricing-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200 cursor-pointer'><Translator path='navbar.main.pricing'/></ScrollLink>
					<ScrollLink to='about-section' spy={true} smooth={true} duration={400} offset={-2 * parseFloat(getComputedStyle(document.documentElement).fontSize)} className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200 cursor-pointer'><Translator path='navbar.main.about'/></ScrollLink>
				</div>
			</div>
			<div className='flex items-center gap-1 mobile:gap-2 h6 mobile:h-10'>
				<a href='#' className='h-6 mobile:h-10 px-2 py-1 mobile:px-4 mobile:py-2 flex items-center justify-center rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster text-cod text-xs mobile:text-base font-semibold duration-200'><Translator path='navbar.main.login'/></a>
				<a href='#' className='h-6 mobile:h-10 px-2 py-1 mobile:px-4 mobile:py-2 flex items-center justify-center rounded bg-royal hover:bg-persian text-white text-xs mobile:text-base font-semibold duration-200'><Translator path='navbar.main.register'/></a>
			</div>
		</nav>
	)
}	

export default Navbar;