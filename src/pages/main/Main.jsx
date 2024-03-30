import './Main.css';
import React, { useEffect } from 'react';
import Translator from '../../components/i18n/Translator.jsx';
import Navbar from '../../components/navigation/main/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Finance from '../../components/icons/Finance.jsx';
import Currency from '../../components/icons/Currency.jsx';
import Data from '../../components/icons/Data.jsx';
import PricingCards from '../../components/main/PricingCards.jsx';
import CompareFeatures from '../../components/main/CompareFeatures.jsx';
import Highlights from '../../components/main/Highlights.jsx';
import Clients from '../../components/main/Clients.jsx';

export default function Main() {
	/*const { isAuthenticated } = useAuth0();
	useEffect(() => {
		isAuthenticated && window.location.replace('/#/main');
	}, [isAuthenticated]);*/
	return (
		<>
			<Navbar/>
			<div id='intro-section' className='main-intro md:min-h-[400px] w-full flex flex-col py-8 gap-8 px-8 md:px-32 exl:px-64 mobile:pb-0'>
				<h1 className='mobile:hidden block text-[4rem] leading-[4.75rem] text-cod font-extrabold'><Translator path='main.intro.title'/></h1>
				<h1 className='mobile:block hidden text-[3rem] leading-[3.5rem] text-cod font-extrabold'><Translator path='main.intro.title_mobile'/></h1>
				<img src='./main_intro.jpg' alt='Intro cover' className='flex-1 h-0 object-cover object-top rounded-lg h-max-[60vh]'/>
				<div className='flex gap-8'>
					<div className='main-intro-stats-1 flex mobile:hidden'>
						<div className='flex flex-col justify-center w-full'>
							<h2 className='text-[3rem] text-cod font-bold'><Translator path='main.intro.users.stats'/></h2>
							<p className='text-base text-shaft font-semibold'><Translator path='main.intro.users.label'/></p>
						</div>
						<div className='flex flex-col justify-center w-full'>
							<h2 className='text-[3rem] text-cod font-bold'><Translator path='main.intro.experience.stats'/></h2>
							<p className='text-base text-shaft font-semibold'><Translator path='main.intro.experience.label'/></p>
						</div>
					</div>
					<div className='main-intro-stats-2 flex flex-wrap gap-4'>
						<p className='text-base text-cod font-semibold'><Translator path='main.intro.subtitle'/></p>
						<div className='flex w-full items-center gap-4 mobile:gap-4 mobile:flex-row-reverse mobile:justify-end'>
							<p className='hidden mobile:flex text-base text-cod font-semibold pl-2'><Translator path='main.intro.join'/></p>
							<div className='relative flex w-[5.1rem] h-[2.2rem] mobile:h-[2.7rem] items-center'>
								<img src='./user_1.jpg' alt='User image example 1' className='h-[2.2rem] mobile:h-[2.7rem] rounded border-[0.1rem] mobile:border-[0.15rem] border-white absolute left-0 z-30'/>
								<img src='./user_2.jpg' alt='User image example 2' className='h-[2.2rem] mobile:h-[2.7rem] rounded border-[0.1rem] mobile:border-[0.15rem] border-white absolute left-6 z-20'/>
								<img src='./user_3.jpg' alt='User image example 3' className='h-[2.2rem] mobile:h-[2.7rem] rounded border-[0.1rem] mobile:border-[0.15rem] border-white absolute left-12 z-10'/>
							</div>
							<a href='#' className='h-8 mobile:h-10 px-4 py-2 flex items-center justify-center rounded bg-royal hover:bg-persian text-white text-sm mobile:text-base font-semibold duration-200'><Translator path='main.intro.cta'/></a>
						</div>
					</div>
				</div>
			</div>
			<div id='features-section' className='md:min-h-[400px] w-full h-auto flex flex-col py-8 gap-8 px-8 md:px-32 exl:px-64 mobile:pb-0'>
				<h2 className='text-[3rem] mobile:text-[2rem] text-cod font-extrabold'><Translator path='main.features.title'/></h2>
				<img src='./graphic.png' alt='Features cover' className='object-cover object-top rounded-lg'/>
				<div className='flex h-[6rem] mobile:h-auto gap-8 mobile:gap-4 mobile:flex-col'>
					<div className='flex p-2 gap-2 w-full justify-center items-center rounded-lg border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
						<Finance className='w-12 h-12 fill-chalice'/>
						<p className='text-[1.25rem] text-cod font-semibold'><Translator path='main.features.cards.finance'/></p>
					</div>
					<div className='flex p-2 gap-2 w-full justify-center items-center rounded-lg border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
						<Currency className='w-12 h-12 fill-chalice'/>
						<p className='text-[1.25rem] text-cod font-semibold'><Translator path='main.features.cards.currency'/></p>
					</div>
					<div className='flex p-2 gap-2 w-full justify-center items-center rounded-lg border-[0.05rem] mobile:border-[0.1rem] border-gallery'>
						<Data className='w-12 h-12 fill-chalice'/>
						<p className='text-[1.25rem] text-cod font-semibold'><Translator path='main.features.cards.data'/></p>
					</div>
				</div>
			</div>
			<div id='pricing-section' className='w-full h-auto flex flex-col py-8 gap-8 px-8 md:px-32 exl:px-64 mobile:pb-0'>
				<h2 className='text-[3rem] mobile:text-[2rem] text-cod font-extrabold'><Translator path='main.pricing.title'/></h2>
				<PricingCards/>
				<h3 className='text-[2rem] mobile:text-[1.5rem] text-cod font-bold'><Translator path='main.pricing.features.title'/></h3>
				<CompareFeatures/>
			</div>
			<div id='about-section' className='w-full h-auto flex flex-col py-8 gap-8 px-8 md:px-32 exl:px-64'>
				<h2 className='text-[3rem] mobile:text-[2rem] text-cod font-extrabold'><Translator path='main.about.title'/></h2>
				<div className='flex flex-col gap-8 lg:grid grid-cols-2 grid-rows-1'>
					<img src='./team.jpg' alt='Team image' className='max-h-[20rem] lg:max-h-none lg:h-auto w-full col-span-1 row-span-1 rounded-lg object-cover object-center'/>
					<p className='col-span-1 row-span-1 text-base text-cod font-semibold text-justify'><Translator path='main.about.description'/></p>
				</div>
				<h3 className='text-[2rem] mobile:text-[1.5rem] text-cod font-bold'><Translator path='main.about.whyUs'/></h3>
				<Highlights/>
				<h3 className='text-[2rem] mobile:text-[1.5rem] text-cod font-bold'><Translator path='main.about.clients'/></h3>
				<Clients/>
			</div>
			<Footer/>
		</>
	)
}