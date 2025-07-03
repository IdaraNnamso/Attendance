// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'; // ✅ Bootstrap styles
import './index.css';

import App from './pages/App.jsx';
import Face from './pages/face.jsx';
import Menu from './pages/menu.jsx';
import Profile from './pages/profile.jsx';
import Attendance from './pages/attendance.jsx';
import Setting from './pages/setting.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/face" element={<Face />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
