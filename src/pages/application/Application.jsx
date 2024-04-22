import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Stats from './Stats';
import Transactions from './Transactions';
import Navbar from '../../components/navigation/app/Navbar';

const Application = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const expiryTime = localStorage.getItem('expiryTime');
    if (!expiryTime) {
      navigate('/login');
    }
    const currentTime = new Date().getTime();
    if (currentTime > parseInt(expiryTime)) {
      navigate('/login');
    }
  }, []);

  return (
    <div className='w-full h-[100dvh] flex flex-col p-8 gap-4 items-center'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </div>
  );
};

export default Application;
