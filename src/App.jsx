import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main.jsx';
import Auth from './pages/auth/Auth.jsx';

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'usd');
    }
  }, []);

  return (
    <>
      <div className='flex flex-col items-center w-full'>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/auth/*' element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
