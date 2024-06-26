import './App.css';
import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { gsap } from 'gsap';
import Main from './pages/main/Main.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import Application from './pages/application/Application.jsx';

export default function App() {
  const appRef = useRef(null);
  useEffect(() => {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'usd');
    }

    gsap.fromTo(appRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });
  }, []);

  const router = [
    { path: '/', element: <Main/> },
    { path: '/login', element: <Login/> },
    { path: '/register', element: <Register/>},
    { path: '/reset-password', element: <ResetPassword/> },
    { path: '/app/*', element: <Application/> },
    { path: '*', element: <Main/> }
  ];

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
        </Helmet>
      </HelmetProvider>
      <div ref={appRef} className='flex flex-col items-center w-full'>
        <Router>
          <Routes>
            {router.map(({ path, element }) => (
              <Route key={path} exact path={path} element={element} />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  )
}
