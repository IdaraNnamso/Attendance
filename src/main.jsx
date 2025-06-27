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
import Sat from './pages/s&t.jsx';
import Sign2 from './pages/sign2.jsx';
import Profile from './pages/profile.jsx';
import Attendance from './pages/attendance.jsx';
import Message from './pages/message.jsx';
import Setting from './pages/setting.jsx';
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
        <Route path="/sat" element={<Sat />} />
        <Route path="/sign2" element={<Sign2 />} />
        <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
           <Route path="/message" element={<Message />} />
           <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
