import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './pages/App.jsx';
import Register from './pages/register.jsx';
import Sent from './pages/sent.jsx';
import Dashboard from "./pages/register.jsx"
import Login from "./pages/login.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />  
       <Route path="/register" element={<Register />} />
       <Route path="/sent" element={<Sent />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
); 

