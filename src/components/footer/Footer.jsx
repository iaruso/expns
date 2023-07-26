import React, { useState } from "react";
import { ReactSVG } from 'react-svg';
import { useTranslation } from 'react-i18next'

const Footer = () => {
	const { i18n } = useTranslation()
	const [isEnglish, setIsEnglish] = useState(true);
  const toggleLanguage = () => {
    setIsEnglish(prevState => !prevState);
		!isEnglish ? i18n.changeLanguage('en-US') : i18n.changeLanguage('pt-PT')
  };

	return (
		<footer className="w-full bg-[#f9f9f9] rounded-lg flex justify-between h-10 px-4 py-2">
			<label className="language-toggle flex items-center cursor-pointer px-2 rounded hover:bg-secondaryHover">
        <input type="checkbox" checked={isEnglish} onChange={toggleLanguage} className="hidden"/>
        <span className="flex items-center h4">
          <ReactSVG src='../../assets/language.svg' className="footer-icon h-4 w-4 fill-main"/>
          <span className="text-sm text-main ml-[0.125rem]">
            {isEnglish ? "English" : "Português"}
          </span>
        </span>
      </label>
			<div className="flex items-center gap-1">
				<a href="#" className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondaryHover"><ReactSVG src='../../assets/linkedin.svg' className="footer-icon h-4 w-4 fill-main"/></a>
				<a href="#" className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondaryHover"><ReactSVG src='../../assets/facebook.svg' className="footer-icon h-4 w-4 fill-main"/></a>
				<a href="#" className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondaryHover"><ReactSVG src='../../assets/instagram.svg' className="footer-icon h-4 w-4 fill-main"/></a>
				<a href="#" className="h-6 w-6 flex items-center justify-center rounded hover:bg-secondaryHover"><ReactSVG src='../../assets/youtube.svg' className="footer-icon h-4 w-4 fill-main"/></a>
			</div>
		</footer>
	)
}	

export default Footer;