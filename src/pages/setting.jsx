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
    fullName: 'Idara Nnamso', 
    email: 'idara.nnamso@example.com',
    phone: '+234 801 234 5678',
    address: '123 HR Street, Victoria Island, Lagos'
  });
  const [profileMessage, setProfileMessage] = useState('');

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [passwordMessage, setPasswordMessage] = useState('');

  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log('Saving profile:', profile);
    setProfileMessage('Profile updated successfully!');
    setTimeout(() => setProfileMessage(''), 3000);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prevPasswords => ({
      ...prevPasswords,
      [name]: value
    }));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordMessage(''); 
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setPasswordMessage('New passwords do not match!');
      return;
    }
    if (passwords.newPassword.length < 6) { 
      setPasswordMessage('New password must be at least 6 characters long!');
      return;
    }
    console.log('Changing password:', passwords.newPassword);
    setPasswordMessage('Password changed successfully!');
    setPasswords({ currentPassword: '', newPassword: '', confirmNewPassword: '' }); 
    setTimeout(() => setPasswordMessage(''), 3000);
  };

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark', !darkMode);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`content-area ${sidebarOpen ? 'with-sidebar-open' : ''}`}>
        <div className="dashboard-header">
          <button className="menu-toggle-button" onClick={toggleSidebar}>
            ☰
          </button>
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
            <Link to='/message'>
            <FontAwesomeIcon icon={faBell} className="header-icon" />
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
            </Link>
          </div>
        </div>

        <div className="settings-container">
          <h2>Settings</h2>
          <div className="settings-section">
            <h3>Edit Profile</h3>
            <form onSubmit={handleProfileSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name:</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  className="settings-input"
                  value={profile.fullName}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="settings-input"
                  value={profile.email}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  className="settings-input"
                  value={profile.phone}
                  onChange={handleProfileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  className="settings-input"
                  value={profile.address}
                  onChange={handleProfileChange}
                />
              </div>
              <button type="submit" className="settings-button">Save Profile</button>
              {profileMessage && <p className={`message ${profileMessage.includes('successfully') ? 'success-message' : 'error-message'}`}>{profileMessage}</p>}
            </form>
          </div>

          <div className="settings-section">
            <h3>Change Password</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password:</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  placeholder="Enter current password"
                  className="settings-input"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="newPassword">New Password:</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter new password"
                  className="settings-input"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                <input
                  type="password"
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="settings-input"
                  value={passwords.confirmNewPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <button type="submit" className="settings-button">Change Password</button>
              {passwordMessage && <p className={`message ${passwordMessage.includes('successfully') ? 'success-message' : 'error-message'}`}>{passwordMessage}</p>}
            </form>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>
            <label className="settings-toggle">
              <input type="checkbox" checked={darkMode} onChange={handleThemeToggle} />
              Enable Dark Mode
            </label>
            <label className="settings-toggle">
              <input type="checkbox" checked={notificationsEnabled} onChange={handleNotificationToggle} />
              Enable Notifications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}