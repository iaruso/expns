import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import LogoFooter from '../icons/LogoFooter';
import Language from '../icons/Language';
import Facebook from '../icons/Facebook';
import Instagram from '../icons/Instagram';
import LinkedIn from '../icons/LinkedIn';
import Youtube from '../icons/Youtube';

const Footer = () => {
	const { t, i18n } = useTranslation();
	const [languageBool, setLanguageBool] = useState(null);
	
	useEffect(() => {
		i18n.language === 'en' ? setLanguageBool(true) : setLanguageBool(false);
	}, [i18n]);
  const toggleLanguage = () => {
    setLanguageBool(prevState => !prevState);
		gsap.to('body', { duration: 0.4, opacity: 0, onComplete: reloadPage });
  };

	const reloadPage = () => {
		!languageBool ? i18n.changeLanguage('en') : i18n.changeLanguage('pt');
		window.scrollTo(0, 0);
		window.location.reload();
	}

	return (
		<footer className='w-full flex flex-col py-8 mobile:px-4 md:px-[10vw] xl:px-[20vw] exl:px-[25vw] border-t-[0.05rem] mobile:border-t-[0.1rem] border-gallery gap-8'>
			<div className='flex gap-8 flex-wrap'>
				<div className='flex flex-col mobile:flex-row flex-1 gap-4 mobile:items-center mobile:flex-none mobile:w-full'>
					<LogoFooter className='w-8 h-8 mobile:w-24 mobile:h-24'/>
					<p className='text-xs mobile:text-tiny text-shaft font-medium max-w-[25vw] mobile:max-w-none'>{t('footer.disclaimer')}</p>
				</div>
				<div className='mobile:grid-cols-2 gap-8 flex flex-wrap'>
					<div className='flex flex-col md:w-32 mobile:w-[calc(50%-1rem)] gap-2'>
						<p className='text-sm mobile:text-base text-cod font-bold'>{t('footer.features.title')}</p>
						<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.0')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.1')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.2')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.3')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.4')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.features.list.5')}</li>
						</ul>
					</div>
					<div className='flex flex-col md:w-32 mobile:w-[calc(50%-1rem)] gap-2'>
						<p className='text-sm mobile:text-base text-cod font-bold'>{t('footer.resources.title')}</p>
						<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.resources.list.0')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.resources.list.1')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.resources.list.2')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.resources.list.3')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.resources.list.4')}</li>
						</ul>
					</div>
					<div className='flex flex-col md:w-32 mobile:w-[calc(50%-1rem)] gap-2'>
						<p className='text-sm mobile:text-base text-cod font-bold'>{t('footer.learn.title')}</p>
						<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.learn.list.0')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.learn.list.1')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.learn.list.2')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.learn.list.3')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.learn.list.4')}</li>
						</ul>
					</div>
					<div className='flex flex-col md:w-32 mobile:w-[calc(50%-1rem)] gap-2'>
						<p className='text-sm mobile:text-base text-cod font-bold'>{t('footer.start.title')}</p>
						<ul className='text-xs mobile:text-tiny text-cod font-medium flex flex-col gap-1'>
						<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.start.list.0')}</li>
							<li className='hover:text-gray hover:duration-[0.4s] ease-in-out cursor-pointer'>{t('footer.start.list.1')}</li>
						</ul>
					</div>
				</div>
			</div>
			<div className='flex items-center justify-between h-8 mobile:h-10'>
				<div className='flex w-32 mobile:w-auto'>
					<div className='flex items-center justify-center cursor-pointer px-2 py-1 mobile:px-4 mobile:py-2 gap-1 mobile:gap-2 mobile:h-10 rounded border-[0.05rem] mobile:border-[0.1rem] border-gallery hover:bg-alabaster duration-[0.4s] ease-in-out' onClick={toggleLanguage}>
						<Language className='h-4 w-4 mobile:w-5 mobile:h-5 fill-cod'/>
						<span className='text-sm mobile:text-base text-cod font-semibold'>
							{languageBool ? 'English' : 'Português'}
						</span>
					</div>
				</div>
				<p className='text-sm text-cod font-medium mobile:hidden'>©2020-2024 Expns, Inc.</p>
				<div className='flex items-center gap-1 mobile:gap-2'>
					<a href='#' aria-label='Facebook' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-[0.4s] ease-in-out'><Facebook className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' aria-label='Instagram' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-[0.4s] ease-in-out'><Instagram className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' aria-label='LinkedIn' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-[0.4s] ease-in-out'><LinkedIn className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
					<a href='#' aria-label='Youtube' className='h-8 w-8 mobile:w-10 mobile:h-10 flex items-center justify-center rounded mobile:border-[0.1rem] mobile:border-gallery hover:bg-alabaster duration-[0.4s] ease-in-out'><Youtube className='h-4 w-4 mobile:w-5 mobile:h-5 fill-chalice'/></a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
