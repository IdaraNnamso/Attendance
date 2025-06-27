import { useState } from 'react';
import Sidebar from '../components/sidebar';
import '../css/dash.css';
import Nugi from '../assets/NI.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  // --- Start: Updated Data for Right Sidebar ---
  const lastActivities = [
    {
      id: 1,
      category: 'Announcement',
      message: 'You posted a new company-wide announcement: "Important Q3 Project Kick-off Meeting."',
      time: 'Just now'
    },
    {
      id: 2,
      category: 'Application',
      message: '<strong>Sarah M.</strong> applied for the "Senior Software Engineer" position.',
      time: '5 mins ago'
    },
    {
      id: 3,
      category: 'Employee Update',
      message: '<strong>John Doe</strong> updated his contact information.',
      time: '15 mins ago'
    },
    {
      id: 4,
      category: 'Job Post',
      message: 'You posted a new job: "Marketing Specialist - Remote".',
      time: '1 hour ago'
    },
    {
      id: 5,
      category: 'Performance Review',
      message: 'Performance review for <strong>Emily R.</strong> is due next week.',
      time: '2 hours ago'
    },
    {
      id: 6,
      category: 'Leave Request',
      message: '<strong>David K.</strong> submitted a leave request for 3 days.',
      time: 'Yesterday'
    },
    {
      id: 7,
      category: 'Announcement',
      message: 'New HR policy on remote work has been published.',
      time: 'Yesterday'
    },
    {
      id: 8,
      category: 'Onboarding',
      message: 'New employee <strong>Maria S.</strong> completed onboarding.',
      time: '2 days ago'
    },
  ];
  // --- End: Updated Data for Right Sidebar ---


  const summaryData = {
    present: 215,
    late: 12,
    absent: 5,
  };

  const employeeData = {
    labels: ['Onsite', 'Remote', 'Off duty'],
    datasets: [{
      data: [65, 25, 10],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336'],
      hoverOffset: 4
    }]
  };

  const employeeOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          }
        }
      }
    }
  };

  const attendanceChartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Hours',
        data: [7, 8, 6, 8, 7, 9],
        backgroundColor: '#6A5ACD',
        borderRadius: 5,
      },
    ],
  };

  const attendanceChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Real Time Attendance',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return value + 'h';
          }
        }
      },
    },
  };

  const recentAttendance = [
    { name: 'Idara Nnamso', date: 'Mar 14, 2024', checkIn: '8:30 AM', checkOut: '5:15 AM', status: 'Present' },
    { name: 'Collins Emelumba', date: 'Mar 13, 2024', checkIn: '6:40 AM', checkOut: '8:15 AM', status: 'Present' },
    { name: 'Collins Echeng', date: 'Mar 12, 2024', checkIn: '8:45 AM', checkOut: '6:15 AM', status: 'Absent' },
    { name: 'Jacinta Bisong', date: 'Mar 12, 2024', checkIn: '7:50 AM', checkOut: '5:10 PM', status: 'Present' },
    { name: 'Williams Elon', date: 'Mar 11, 2024', checkIn: '6:40 AM', checkOut: '7:00 AM', status: 'Present' },
    { name: 'Cristiano Ronaldo', date: 'Mar 10, 2024', checkIn: '6:50 AM', checkOut: '5:45 PM', status: 'Present' },
    { name: 'Elon Musk', date: 'Mar 10, 2024', checkIn: '7:40 AM', checkOut: '4:20 PM', status: 'Late' },
    { name: 'Jun Young-Hyun', date: 'Mar 10, 2024', checkIn: '9:45 AM', checkOut: '8:20 AM', status: 'Present' },
  ];

  const getCurrentDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date().toLocaleDateString(undefined, options);
  };


  return (
    <div className="dashboard-layout">
      <button
        onClick={() => setMenuOpen(true)}
        className="menu-toggle-button"
        aria-label="Open menu"
      >
        ☰
      </button>

      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={`content-area ${menuOpen ? 'with-sidebar-open' : ''}`}>
        <header className="dashboard-header">
          <div className="header-left">
            {/* Using Nugi image here as per your other components */}
            <Link to="/" className="hr-logo">
              <img src={Nugi} alt="Nugi Logo" style={{ height: '40px' }} />
            </Link>
            <div className="search-bar">
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search here" />
            </div>
          </div>
          <div className="header-right">
            <span className="current-date">{getCurrentDate()}</span> {/* Dynamic date */}
            <Link to='/message'>
               <FontAwesomeIcon icon={faBell} className="header-icon" />
            </Link>

            <Link to='/profile'>
              <FontAwesomeIcon icon={faUserCircle} className="header-icon" />
            </Link>

          </div>
        </header>

        <main className="main-content">
          <section className="welcome-section">
            <div className="welcome-card card">
              <h2>Welcome to Admin dashboard, Idara!</h2>
              <div className="announcement-stats">
                <button className="add-announcement-btn">Add Announcements</button>
                <div className="stat-item">
                  <span className="stat-label">O active</span>
                  <span className="stat-value">0</span>
                </div>
                <div className="stat-item new-resume">
                  <span className="stat-value">12 new resume</span>
                </div>
              </div>
            </div>

            <div className="employee-manage-card card">
              <h3>Manage Employee</h3>
              <div className="employee-chart-container">
                <div className="chart-wrapper">
                  <Doughnut data={employeeData} options={employeeOptions} />
                </div>
                <div className="employee-stats">
                  <p><span className="dot onsite"></span> Onsite: 65</p>
                  <p><span className="dot remote"></span> Remote: 25</p>
                  <p><span className="dot off-duty"></span> Off duty: 10</p>
                </div>
              </div>
            </div>
          </section>

          <section className="attendance-summary-charts">
            <div className="real-time-attendance-chart card">
              <Bar data={attendanceChartData} options={attendanceChartOptions} />
            </div>

            <div className="summary-percentages card">
              <h3>Summary</h3>
              <ul>
                <li><span>70.3%</span></li>
                <li><span>48.5%</span></li>
                <li><span>94.9%</span></li>
                <li><span>94.9%</span></li>
              </ul>
            </div>
          </section>

          <section className="attendance-table card">
            <h3>Attendance Report</h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAttendance.map((record, i) => (
                    <tr key={i}>
                      <td>{record.name}</td>
                      <td>{record.date}</td>
                      <td>{record.checkIn}</td>
                      <td>{record.checkOut}</td>
                      <td>{record.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>

        <aside className="right-sidebar">
          <h3>Last activities <a href="#" className="view-all">View all</a></h3>
          <div className="activity-list">
            {lastActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                {activity.category && <p className="activity-category">{activity.category}</p>}
                <p dangerouslySetInnerHTML={{ __html: activity.message }}></p>
                <span className="activity-time">{activity.time}</span> {/* Added time */}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}