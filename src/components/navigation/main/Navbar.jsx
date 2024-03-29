import React, { useState, useEffect } from 'react';
import Logo from '../../icons/Logo.jsx';
import Translator from '../../i18n/Translator.jsx';

const Navbar = () => {
	return (
		<nav className='w-full flex justify-between h-12 py-2 border-b-[0.05rem] border-gallery sticky top-0 bg-white px-8 md:px-32 exl:px-64 z-50'>
			<div className='flex items-center gap-4'>
				<div className='flex items-center gap-1'>
					<Logo className='w-3 h-3'/>
					<p className='text-main font-extrabold text-persian'>Expns</p>
				</div>
				<div className='hidden items-center gap-1 h6 md:flex'>
					<a href='#' className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200'><Translator path='navbar.main.features'/></a>
					<a href='#' className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200'><Translator path='navbar.main.pricing'/></a>
					<a href='#' className='h-6 px-2 py-1 flex items-center justify-center rounded hover:bg-alabaster text-cod text-xs font-semibold duration-200'><Translator path='navbar.main.about'/></a>
				</div>
			</div>
			<div className='flex items-center gap-1 h6'>
				<a href='#' className='h-6 px-2 py-1 flex items-center justify-center rounded border-[0.05rem] border-gallery hover:bg-alabaster text-cod text-xs font-semibold duration-200'><Translator path='navbar.main.login'/></a>
				<a href='#' className='h-6 px-2 py-1 flex items-center justify-center rounded bg-royal hover:bg-persian text-white text-xs font-semibold duration-200'><Translator path='navbar.main.register'/></a>
			</div>
		</nav>
	)
}	

export default Navbar;