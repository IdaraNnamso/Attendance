import { useState } from 'react';
import Sidebar from '../components/sidebar';
import './css/attendance.css';
import '../css/dash.css';
import Nugi from '../assets/NI.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { UserCircle, Calendar, Clock, CheckCircle, XCircle, Slash } from 'lucide-react'; // Icons for status and details

// Mock Data for Recent Attendance
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
    profileImg: 'data:image/jpeg;base64,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',
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

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

  return (
    <div className="attendance-layout"> {/* New wrapper div for sidebar and content */}
   

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`attendance-content-area ${sidebarOpen ? 'with-sidebar' : ''}`}> {/* Content area for attendance page */}
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
