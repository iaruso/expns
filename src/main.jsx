import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './App.css';
import './index.css';
import './i18n/index.js'


const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
		<App />
  </React.StrictMode>
);
