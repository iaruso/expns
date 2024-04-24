import './Application.css';
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
    <div className='w-full h-[100dvh] relative flex flex-col exl:px-[20rem] xl:px-[12rem] lg:px-[10rem] md:px-[4rem] py-8 mobile:p-0 gap-4 items-center'>
      <Navbar/>
      <div className='w-full h-full flex flex-col gap-4 mobile:px-4'>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/stats" element={<Stats/>} />
          <Route path="/transactions" element={<Transactions/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Application;
