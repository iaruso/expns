import React, { useState, useEffect } from "react";
import { ReactSVG } from 'react-svg';
import Translator from "../i18n/Translator";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from 'react-i18next'

const Topbar = ({ value = true }) => {
	const { i18n } = useTranslation();
	const { loginWithPopup } = useAuth0();
	const [languageValue, setLanguageValue] = useState(null);
	useEffect(() => {
		i18n.language === 'en-US' ? setLanguageValue('en') : setLanguageValue('pt-PT');
	}, [i18n.language]);
	return (
		<nav className={`w-full bg-[#f9f9f9] rounded-lg flex h-10 px-4 py-2 border-[0.05rem] border-[#F4F4F4] ${ !value ? 'justify-center' : 'justify-between'}`}>
			<div className="flex items-center">
				<ReactSVG src='../../assets/logo.svg' className="h-4 w-4 fill-main ml-"/>
				<p className="text-main font-bold ml-2">Expns</p>
			</div>
			{ !value ? 
				null
				:
				<div className="flex items-center gap-2">
					<a href="#" className="h-6 px-2 flex items-center justify-center rounded hover:bg-secondaryHover text-main text-xs font-semibold" onClick={() => loginWithPopup()}><Translator path="topbar.login"/></a>
					<a href="#" className="h-6 px-2 flex items-center justify-center rounded bg-main hover:bg-mainHover text-white text-xs font-semibold" onClick={() => loginWithPopup({ authorizationParams: {screen_hint: 'signup', ui_locales: languageValue }})}><Translator path="topbar.register"/></a>
				</div>
			}
		</nav>
	)
}	

export default Topbar;