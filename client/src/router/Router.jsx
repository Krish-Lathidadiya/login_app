import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from '../components/Register'
import EmailVerify from '../components/EmailVerify';
import Otp from '../components/Otp';
import Login from '../components/Login';
import Reset from '../components/Reset';
import ErrorPage from '../components/ErrorPage';
import Home from '../components/Home';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Login/>} />
        <Route path="/Register" element={<Register />} />
        <Route path="/EmailVerify" element={<EmailVerify />} />
        <Route path="/Otp" element={<Otp />} />
        <Route path="/Reset" element={<Reset />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
