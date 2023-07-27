import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './App.css';
import './index.css';
import './i18n/index.js'
import { GlobalProvider } from './context/global.jsx';
import { Auth0Provider } from '@auth0/auth0-react';

const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
		<Auth0Provider
			domain='https://dev-ho5mv6mmysfgicph.eu.auth0.com'
			clientId='Enfdv2pFYvOxPf0QKYwIT9UGiP1ftby6'
			redirectUri={window.location.origin}
			cacheLocation="localstorage"
		>
			<GlobalProvider>
				<App />
			</GlobalProvider>
		</Auth0Provider>
  </React.StrictMode>
);
