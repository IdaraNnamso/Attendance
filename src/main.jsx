// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import App from './pages/App.jsx';
import Register from './pages/register.jsx';
import Sent from './pages/sent.jsx';
import Dashboard from './pages/dashboard.jsx';
import Login from './pages/login.jsx';
import Face from './pages/face.jsx'; // This is the old Video.jsx renamed to Face.jsx
import Sign from './pages/sign.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sent" element={<Sent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/face" element={<Face />} /> {/* Face (was Video) goes here */}
        <Route path="/sign" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
