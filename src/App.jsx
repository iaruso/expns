import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from "./pages/Main/Main.jsx"; // Import the Main component here
import Auth from "./pages/Auth/Auth.jsx"; // Import the Auth component here

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
            <Route path="/" element={<Main />} />
            <Route path="/auth/*" element={<Auth />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}
