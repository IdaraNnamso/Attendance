import { FaHome, FaUserPlus, FaDatabase, FaCamera, FaUsers, FaCalendarAlt, FaMoneyBillWave, FaChartBar, FaEnvelope, FaCog, FaSignOutAlt, FaBell } from 'react-icons/fa';
import '../css/sidebar.css';

export default function Sidebar({ isOpen, onClose }) {
  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const navItems = [
    { icon: FaHome, label: 'Dashboard', path: '/menu', active: true }, 
    { icon: FaCamera, label: 'Take Attendace', path: '/face', active: false },
    { icon: FaCalendarAlt, label: 'Attendance', path: '/attendance', active: false }, 

    { icon: FaCog, label: 'Settings', path: '/setting', active: false },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close-btn" onClick={onClose}>✖</button>
       
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className={item.active ? 'active' : ''}>
                <a href={item.path} className="sidebar-nav-link" onClick={handleLinkClick}>
                  <item.icon className="nav-icon" /> 
                  <span className="nav-label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
