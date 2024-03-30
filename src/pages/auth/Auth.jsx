import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../components/auth/Login.jsx';
import Register from '../../components/auth/Register.jsx';
import ResetPassword from '../../components/auth/ResetPassword.jsx';

export default function Auth() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
      </Routes>
    </>
  );
};
