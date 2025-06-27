import { useState } from 'react';
import Sidebar from '../components/sidebar';
import './css/attendance.css';
import '../css/dash.css';
import Nugi from '../assets/NI.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserCircle, Calendar, Clock, CheckCircle, XCircle, Slash } from 'lucide-react';

const recentAttendanceData = [
  {
    id: 1,
    name: 'Alice Johnson',
    profileImg: 'https://www.shutterstock.com/image-photo/smiling-african-american-millennial-businessman-600nw-1437938108.jpg',
    course: 'Web Development Basics',
    date: '2025-06-24',
    timeIn: '08:55 AM',
    timeOut: '-',
    status: 'Present',
  },
  {
    id: 2,
    name: 'Jeff Besos',
    profileImg: 'https://cdn.britannica.com/56/199056-050-CCC44482/Jeff-Bezos-2017.jpg?w=385',
    course: 'Data Science Fundamentals',
    date: '2025-06-24',
    timeIn: '09:10 AM',
    timeOut: '-',
    status: 'Late',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRdQ6WOe65-6NIVOkmyAQidFlmL40mJZsww&s',
    course: 'Digital Marketing Advanced',
    date: '2025-06-24',
    timeIn: '-',
    timeOut: '-',
    status: 'Absent',
  },
  {
    id: 4,
    name: 'Diana Prince',
    profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRdQ6WOe65-6NIVOkmyAQidFlmL40mJZsww&s',
    course: 'Cybersecurity Essentials',
    date: '2025-06-23',
    timeIn: '08:59 AM',
    timeOut: '04:05 PM',
    status: 'Present',
  },
  {
    id: 5,
    name: 'Eve Adams',
    profileImg: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFQLcJ1qnAUVtgFqNmazjnyycV4_X-Zg2xxw&s',
    course: 'Mobile App Development',
    date: '2025-06-23',
    timeIn: '09:02 AM',
    timeOut: '03:58 PM',
    status: 'Present',
  },
  {
    id: 6,
    name: 'Frank Green',
    profileImg: 'https://ichef.bbci.co.uk/ace/standard/981/cpsprodpb/5c38/live/16192430-f5ef-11ef-bd6e-cd71c2e1454a.jpg',
    course: 'Artificial Intelligence',
    date: '2025-06-23',
    timeIn: '-',
    timeOut: '-',
    status: 'Absent',
  },
  {
    id: 7,
    name: 'Grace Hall',
    profileImg: 'https://s.hs-data.com/bilder/spieler/gross/182941.jpg?fallback=png',
    course: 'Game Design Principles',
    date: '2025-06-23',
    timeIn: '09:05 AM',
    timeOut: '04:02 PM',
    status: 'Late',
  },
];

export default function RecentAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
            <FontAwesomeIcon icon={faBell} className="header-icon" />
            <Link to="/settings">
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
              <table>
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Date</th>
                    <th>Time In</th>
                    <th>Time Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendanceData.map((record) => (
                    <tr key={record.id}>
                      <td className="student-profile-cell">
                        <img src={record.profileImg} alt={record.name} className="student-profile-img" />
                        <span className="student-name">{record.name}</span>
                      </td>
                      <td>{record.course}</td>
                      <td><Calendar size={16} className="table-icon" /> {record.date}</td>
                      <td><Clock size={16} className="table-icon" /> {record.timeIn}</td>
                      <td><Clock size={16} className="table-icon" /> {record.timeOut}</td>
                      <td>
                        <span className={`status-badge status-${record.status.toLowerCase()}`}>
                          {getStatusIcon(record.status)} {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
