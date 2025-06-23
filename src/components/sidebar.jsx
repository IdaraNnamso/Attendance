import { FaHome, FaUserPlus, FaDatabase, FaCamera } from 'react-icons/fa';
import '../css/sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2 className="sidebar-title">Nugi attendance</h2>
        <nav className="sidebar-nav">
          <a href="/dashboard" className="sidebar-link" onClick={handleLinkClick}><FaHome /> <span>Dashboard</span></a>
          <a href="/register" className="sidebar-link" onClick={handleLinkClick}><FaUserPlus /> <span>Register</span></a>
          <a href="#" className="sidebar-link" onClick={handleLinkClick}><FaCamera /> <span>Scan</span></a>
          <a href="#" className="sidebar-link" onClick={handleLinkClick}><FaDatabase /> <span>Records</span></a>
        </nav>
      </aside>
    </>
  );
}
