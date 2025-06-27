// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';

import App from './pages/App.jsx';
import Face from './pages/Face.jsx'; // Make sure this file is named EXACTLY Face.jsx (capital F)
import Menu from './pages/Menu.jsx';
import Profile from './pages/Profile.jsx';
import Attendance from './pages/Attendance.jsx';
import Message from './pages/Message.jsx';
import Setting from './pages/Setting.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/face" element={<Face />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/message" element={<Message />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
