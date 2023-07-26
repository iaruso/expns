import React, { useEffect } from "react";
import Topbar from "../components/navigation/Topbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import Translator from "../components/i18n/Translator.js";
import { useAuth0 } from "@auth0/auth0-react";

export default function Promo() {
	const { isAuthenticated } = useAuth0();
	useEffect(() => {
		isAuthenticated && window.location.replace("/#/main");
	}, [isAuthenticated]);
	return (
		<div className="flex flex-col w-[44rem]">
			<Topbar/>
			<div className="h-full grid grid-cols-2 gap-4 w-full py-4">
				<div className="flex flex-col">
					<h1 className="text-big font-semibold text-main p-4"><Translator path="promo.main"/></h1>
					<div className="promo-texture h-full w-full rounded-lg"></div>
				</div>
				<div className="flex flex-col">
					<div className="promo-image h-full w-full bg-main rounded-lg"></div>
					<h1 className="text-big font-semibold text-main p-4"><Translator path="promo.secondary"/></h1>
				</div>
			</div>
			<Footer/>
		</div>
	)
}