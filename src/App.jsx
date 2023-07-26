import React, { useState, useEffect } from "react";
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Promo from "./pages/Promo";
import Main from "./pages/Main";
import Statistics from "./pages/Statistics";
import Transactions from "./pages/Transactions";
import Topbar from "./components/navigation/Topbar";

const router = createHashRouter([
  { path: '/', element: <Promo/> },
  { path: '/main', element: <Main/> },
  { path: '/statistics', element: <Statistics/> },
  { path: '/transactions', element: <Transactions/> },
]);

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'eur');
    }
  }, []);
  return (
    <>
      <div className='flex flex-col w-[44rem] items-center'>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}
