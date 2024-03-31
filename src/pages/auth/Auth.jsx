import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Login from '../../components/auth/Login.jsx';
import Register from '../../components/auth/Register.jsx';
import ResetPassword from '../../components/auth/ResetPassword.jsx';

export default function Auth() {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Helmet>
        <Routes>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/reset-password" element={<ResetPassword/>} />
        </Routes>
      </HelmetProvider>
    </>
  );
};
