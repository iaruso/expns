import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';

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
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/register' element={<Register />} />
            <Route path='/auth/reset-password' element={<ResetPassword />} />
            <Route path='*' element={<Main />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
