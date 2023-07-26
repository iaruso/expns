import React from "react";
import { ReactSVG } from 'react-svg';
import Translator from "../i18n/Translator";
import { useAuth0 } from "@auth0/auth0-react";

const Topbar = () => {
	const { loginWithRedirect } = useAuth0();
	return (
		<nav className="w-full bg-[#f9f9f9] rounded-lg flex justify-between h-10 px-4 py-2">
			<div className="flex items-center">
				<ReactSVG src='../../assets/logo.svg' className="h-4 w-4 fill-main ml-"/>
				<p className="text-main font-bold ml-2">Expns</p>
			</div>
			<div className="flex items-center gap-2">
				<a href="#" className="h-6 px-2 flex items-center justify-center rounded hover:bg-secondaryHover text-main text-xs font-semibold" onClick={() => loginWithRedirect()}><Translator path="topbar.login"/></a>
				<a href="#" className="h-6 px-2 flex items-center justify-center rounded bg-main hover:bg-mainHover text-white text-xs font-semibold" onClick={() => loginWithRedirect({screen_hint: 'signup'})}><Translator path="topbar.register"/></a>
			</div>
		</nav>
	)
}	

export default Topbar;