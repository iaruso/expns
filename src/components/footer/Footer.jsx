import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Translator from '../i18n/Translator';
import LogoFooter from '../icons/LogoFooter';
import Language from '../icons/Language';
import Facebook from '../icons/Facebook';
import Instagram from '../icons/Instagram';
import Linkedin from '../icons/Linkedin';
import Youtube from '../icons/Youtube';

const Footer = () => {
	const { i18n } = useTranslation();
	const [languageBool, setLanguageBool] = useState(null);
	
	useEffect(() => {
		i18n.language === 'en-US' ? setLanguageBool(true) : setLanguageBool(false);
	}, [i18n]);
  const toggleLanguage = () => {
    setLanguageBool(prevState => !prevState);
    !languageBool ? i18n.changeLanguage('en-US') : i18n.changeLanguage('pt-PT');
    window.location.reload();
  };

	return (
		<footer className='w-full flex flex-col py-8 px-8 md:px-32 exl:px-64 border-t-[0.05rem] mobile:border-t-[0.1rem] border-gallery gap-8'>
			<div className='flex gap-8 flex-wrap'>
				<div className='flex flex-col mobile:flex-row flex-1 gap-4 mobile:items-center mobile:flex-none mobile:w-full'>
					<LogoFooter className='w-8 h-8 mobile:w-24 mobile:h-24'/>
					<p className='text-xs mobile:text-tiny text-shaft font-medium max-w-[25vw] mobile:max-w-none'><Translator path={'footer.disclaimer'}/></p>
				</div>
				<div className='flex flex-col w-32 gap-2'>
					<p className='text-sm mobile:text-base text-cod font-bold'><Translator path={'footer.features.title'}/></p>
					<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.0'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.1'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.2'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.3'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.4'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.features.list.5'}/></a></li>
					</ul>
				</div>
				<div className='flex flex-col w-32 gap-2'>
					<p className='text-sm mobile:text-base text-cod font-bold'><Translator path={'footer.resources.title'}/></p>
					<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.resources.list.0'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.resources.list.1'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.resources.list.2'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.resources.list.3'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.resources.list.4'}/></a></li>
					</ul>
				</div>
				<div className='flex flex-col w-32 gap-2'>
					<p className='text-sm mobile:text-base text-cod font-bold'><Translator path={'footer.learn.title'}/></p>
					<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.learn.list.0'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.learn.list.1'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.learn.list.2'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.learn.list.3'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.learn.list.4'}/></a></li>
					</ul>
				</div>
				<div className='flex flex-col w-32 gap-2'>
					<p className='text-sm mobile:text-base text-cod font-bold'><Translator path={'footer.start.title'}/></p>
					<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.start.list.0'}/></a></li>
						<li><a className='hover:text-gray duration-200 cursor-pointer'><Translator path={'footer.start.list.1'}/></a></li>
					</ul>
				</div>
			</div>
			<div className='flex items-center justify-between h-8 mobile:h-10'>
				<div className='flex w-32 mobile:w-auto'>
					<div className='flex items-center justify-center cursor-pointer px-2 py-1 mobile:px-4 mobile:py-2 gap-1 mobile:gap-2 mobile:h-10 rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster duration-200' onClick={toggleLanguage}>
						<Language className='h-4 w-4 mobile:w-5 mobile:h-5 fill-cod'/>
						<span className='text-sm mobile:text-base text-cod font-semibold'>
							{languageBool ? 'English' : 'Português'}
						</span>
					</div>
				</div>
				<p className='text-sm text-cod font-medium mobile:hidden'>©2020-2024 Expns, Inc.</p>
				<div className='flex items-center gap-1 mobile:gap-2'>
					<a href='#' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-200'><Facebook className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-200'><Instagram className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-200'><Linkedin className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-200'><Youtube className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;