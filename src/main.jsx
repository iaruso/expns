import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './App.css';
import './index.css';
import './i18n/index.js';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
		<App />
  </React.StrictMode>
);
