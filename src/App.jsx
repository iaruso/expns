import React, { useEffect } from "react";
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Main from "./pages/main/Main.jsx";

const router = createHashRouter([
  { path: '/', element: <Main/> }
]);

export default function App() {
  useEffect(() => {
    if (!localStorage.getItem('currency')) {
      localStorage.setItem('currency', 'usd');
    }
  }, []);
  return (
    <>
      <div className='flex flex-col items-center'>
        <RouterProvider router={router}/>
      </div>
    </>
  )
}
