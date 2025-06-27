import React, { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../css/messaage.css';
import '../css/dash.css';
import Nugi from '../assets/NI.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Messaage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const messages = [
    {
      title: "Best Attendance Award",
      content: "John Doe has maintained 100% attendance this month. Reward recommendation pending.",
      type: "success",
      date: "2025-06-25",
    },
    {
      title: "Frequent Late Arrival Warning",
      content: "Jane Smith was late 5 times this week. Consider reviewing her schedule and providing support.",
      type: "warning",
      date: "2025-06-24",
    },
    {
      title: "Multiple Absentees Today",
      content: "5 students were absent today: Alex, Nia, Toby, Zara, and Chris. Follow-up is required.",
      type: "alert",
      date: "2025-06-25",
    },
    {
      title: "New Feature Alert!",
      content: "A new attendance export feature has been added to the dashboard. Check it out now!",
      type: "info",
      date: "2025-06-23",
    },
    {
      title: "Upcoming Holiday Reminder",
      content: "Reminder: The office will be closed on July 4th for Independence Day. Please plan accordingly.",
      type: "info",
      date: "2025-06-22",
    },
    {
      title: "Performance Review Due",
      content: "It's time for Sarah Chen's annual performance review. Please schedule a meeting by end of week.",
      type: "warning",
      date: "2025-06-21",
    },
    {
      title: "Outstanding Task Completed",
      content: "The Q2 financial report has been successfully submitted. Great work, Finance Team!",
      type: "success",
      date: "2025-06-20",
    },
    {
      title: "Server Maintenance Scheduled",
      content: "Scheduled server maintenance will occur tonight from 1 AM to 3 AM. Expect brief service interruptions.",
      type: "info",
      date: "2025-06-19",
    },
    {
      title: "Security Incident Reported",
      content: "A minor security incident was reported in Sector C. Investigation is underway. No major breach detected.",
      type: "alert",
      date: "2025-06-18",
    },
    {
      title: "New Employee Onboarding",
      content: "Welcome, Emily White! She joins us as a Junior Developer. Please extend a warm welcome.",
      type: "success",
      date: "2025-06-17",
    },
    {
      title: "Budget Review Required",
      content: "The marketing department's Q3 budget proposal requires your immediate review and approval.",
      type: "warning",
      date: "2025-06-16",
    },
    {
      title: "Critical System Update",
      content: "A critical system update has been deployed. Please restart your applications for changes to take effect.",
      type: "alert",
      date: "2025-06-15",
    },
    {
      title: "Company Picnic Announcement",
      content: "Don't forget our annual company picnic next Saturday! RSVP by Friday.",
      type: "info",
      date: "2025-06-14",
    },
    {
      title: "Project Milestone Achieved",
      content: "Project 'Phoenix' has successfully reached its first milestone. Congratulations to the team!",
      type: "success",
      date: "2025-06-13",
    },
  ];

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
            <FontAwesomeIcon icon={faBell} className="header-icon" />
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
            </Link>
          </div>
        </div>

        <div className="message-page">
          <h2>Admin Messages</h2>
          <div className="message-list">
            {messages.map((msg, index) => (
              <div key={index} className={`message-card ${msg.type}`}>
                <h3>{msg.title}</h3>
                <p>{msg.content}</p>
                <span className="message-date">{msg.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}