import { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import '../css/attendance.css';
import '../css/dash.css';
import Nugi from '../assets/NI.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, XCircle, Slash } from 'lucide-react';

export default function RecentAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('attendanceData');
    if (saved) {
      setAttendanceData(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return <CheckCircle size={18} />;
      case 'Absent':
        return <XCircle size={18} />;
      case 'Late':
        return <Slash size={18} />;
      default:
        return null;
    }
  };

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}

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
            <Link to='/message'>
              <FontAwesomeIcon icon={faBell} className="header-icon" />
            </Link>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
            </Link>
          </div>
        </div>

        <div className="attendance-page-container">
          <h2 className="attendance-page-title">Recent Attendance Records</h2>
          <p className="attendance-page-subtitle">Overview of student attendance history.</p>

          <div className="attendance-table-card card">
            <div className="card-header">
              <h3>Daily Attendance Log</h3>
              <button className="view-all-btn">Export Data</button>
            </div>
            <div className="table-responsive">
              {attendanceData.length === 0 ? (
                <p style={{ padding: '1rem' }}>No attendance records found.</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th className="hide-mobile">Course</th>
                      <th>Date</th>
                      <th>Time In</th>
                      <th className="hide-mobile">Time Out</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((record) => (
                      <tr key={record.id}>
                        <td className="student-profile-cell">
                          <img src={record.profileImg} alt={record.name} className="student-profile-img" />
                          <span className="student-name">{record.name}</span>
                        </td>
                        <td className="hide-mobile">{record.course}</td>
                        <td><Calendar size={16} className="table-icon" /> {record.date}</td>
                        <td><Clock size={16} className="table-icon" /> {record.timeIn}</td>
                        <td className="hide-mobile"><Clock size={16} className="table-icon" /> {record.timeOut}</td>
                        <td>
                          <span className={`status-badge status-${record.status.toLowerCase()}`}>
                            {getStatusIcon(record.status)} {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
