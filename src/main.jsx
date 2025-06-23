// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import App from './pages/App.jsx';
import Register from './pages/register.jsx';
import Sent from './pages/sent.jsx';
import Login from './pages/login.jsx';
import Face from './pages/face.jsx'; 
import Sign from './pages/sign.jsx';
import Menu from './pages/menu.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/face" element={<Face />} /> 
        <Route path="/sign" element={<Sign />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
