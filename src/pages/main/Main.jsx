import './Main.css';
import React, { useEffect } from 'react';
import Navbar from '../../components/navigation/main/Navbar.jsx';
import Footer from '../../components/footer/Footer.jsx';
import Translator from '../../components/i18n/Translator.jsx';
import { useAuth0 } from '@auth0/auth0-react';

export default function Main() {
	/*const { isAuthenticated } = useAuth0();
	useEffect(() => {
		isAuthenticated && window.location.replace('/#/main');
	}, [isAuthenticated]);*/
	return (
		<>
			<Navbar />
			<div className='main-intro min-h-[400px] w-full flex flex-col px-16 py-8 gap-8'>
				<h1 className='text-[4rem] leading-[4.75rem] text-cod font-extrabold'><Translator path='main.intro.title'/></h1>
				<img src='./assets/main_intro.jpg' alt='Intro cover' className='flex-1 h-0 object-cover object-top rounded-lg'/>
				<div className='flex gap-8'>
					<div className='main-intro-stats-1 flex'>
						<div className='flex flex-col justify-center w-full'>
							<h2 className='text-[3rem] text-cod font-bold'><Translator path='main.intro.users.stats'/></h2>
							<p className='text-base text-cod font-semibold'><Translator path='main.intro.users.label'/></p>
						</div>
						<div className='flex flex-col justify-center w-full'>
							<h2 className='text-[3rem] text-cod font-bold'><Translator path='main.intro.experience.stats'/></h2>
							<p className='text-base text-cod font-semibold'><Translator path='main.intro.experience.label'/></p>
						</div>
					</div>
					<div className='main-intro-stats-2 flex flex-wrap gap-4'>
						<h3 className='text-base text-cod font-semibold'><Translator path='main.intro.subtitle'/></h3>
						<div className='flex gap-4 items-center'>
							<div className='relative flex w-[5.1rem] h-[2.2rem]'>
								<img src='./assets/user_1.jpg' alt='User image example 1' className='h-[2.2rem] rounded border-[0.1rem] border-white absolute left-0 z-30'/>
								<img src='./assets/user_2.jpg' alt='User image example 2' className='h-[2.2rem] rounded border-[0.1rem] border-white absolute left-6 z-20'/>
								<img src='./assets/user_3.jpg' alt='User image example 3' className='h-[2.2rem] rounded border-[0.1rem] border-white absolute left-12 z-10'/>
							</div>
							<a href='#' className='h-8 px-4 py-2 flex items-center justify-center rounded bg-royal hover:bg-persian text-white text-sm font-semibold duration-200'><Translator path='main.intro.cta'/></a>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	)
}