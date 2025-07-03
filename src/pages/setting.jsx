import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../css/setting.css'; 
import '../css/dash.css'; 
import Nugi from '../assets/NI.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Setting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const getCurrentDate = () => {
    return new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`content-area ${sidebarOpen ? 'with-sidebar-open' : ''}`}>
        <div className="dashboard-header">
          <button className="menu-toggle-button" onClick={toggleSidebar}>☰</button>
          <div className="header-left">
            <Link to="/" className="hr-logo">
              <img src={Nugi} alt="Nugi Logo" style={{ height: '40px' }} />
            </Link>
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} color="#aaa" />
              <input type="text" placeholder="Search here" />
            </div>
          </div>
          <div className="header-right">
            <span className="current-date">{getCurrentDate()}</span>
            <Link to="/message"><FontAwesomeIcon icon={faBell} className="header-icon" /></Link>
            <Link to="/profile"><FontAwesomeIcon icon={faUserCircle} className="header-icon" /></Link>
          </div>
        </div>

        <div className="settings-container">
          <h2>Settings</h2>

          <div className="settings-section">
            <h3>Edit Profile</h3>
            <form>
              <div className="form-group">
                <label>Full Name:</label>
                <input type="text" name="fullName" value={profile.fullName} onChange={(e) => handleInputChange(e, setProfile)} className="settings-input" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={profile.email} onChange={(e) => handleInputChange(e, setProfile)} className="settings-input" />
              </div>
              <div className="form-group">
                <label>Phone:</label>
                <input type="tel" name="phone" value={profile.phone} onChange={(e) => handleInputChange(e, setProfile)} className="settings-input" />
              </div>
              <div className="form-group">
                <label>Address:</label>
                <input type="text" name="address" value={profile.address} onChange={(e) => handleInputChange(e, setProfile)} className="settings-input" />
              </div>
              <button type="submit" className="settings-button">Save Profile</button>
            </form>
          </div>

          <div className="settings-section">
            <h3>Change Password</h3>
            <form>
              <div className="form-group">
                <label>Current Password:</label>
                <input type="password" name="currentPassword" value={passwords.currentPassword} onChange={(e) => handleInputChange(e, setPasswords)} className="settings-input" />
              </div>
              <div className="form-group">
                <label>New Password:</label>
                <input type="password" name="newPassword" value={passwords.newPassword} onChange={(e) => handleInputChange(e, setPasswords)} className="settings-input" />
              </div>
              <div className="form-group">
                <label>Confirm New Password:</label>
                <input type="password" name="confirmNewPassword" value={passwords.confirmNewPassword} onChange={(e) => handleInputChange(e, setPasswords)} className="settings-input" />
              </div>
              <button type="submit" className="settings-button">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
