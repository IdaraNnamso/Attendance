import { FaMessage } from 'react-icons/fa6';
import '../components/sidebar.css';
import { FaHome, FaUserPlus, FaDatabase, FaCamera } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Nugi Attendance</h2>
      <nav className="sidebar-nav">
        <a href="/" className="sidebar-link">
          <FaHome /> <span>Dashboard</span>
        </a>
        <a href="/register" className="sidebar-link">
          <FaUserPlus /> <span>Register</span>
        </a>
        <a href="#" className="sidebar-link">
          <FaCamera /> <span>Take Attendance</span>
        </a>
        <a href="#" className="sidebar-link">
          <FaDatabase /> <span>Records</span>
        </a>
      </nav>
    </aside>
  );
}
