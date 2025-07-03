import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Sidebar from '../components/sidebar';
import Nugi from '../assets/NI.png';
import '../css/dash.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ACTIVITIES = [
    { id: 1, category: 'Announcement', message: 'You posted a new company-wide announcement: "Important Q3 Project Kick-off Meeting."', time: 'Just now' },
    { id: 2, category: 'Application', message: 'Sarah M. applied for the "Senior Software Engineer" position.', time: '5 mins ago' },
    { id: 3, category: 'Employee Update', message: 'John Doe updated his contact information.', time: '15 mins ago' },
    { id: 4, category: 'Job Post', message: 'You posted a new job: "Marketing Specialist - Remote".', time: '1 hour ago' },
    { id: 5, category: 'Performance Review', message: 'Performance review for Emily R. is due next week.', time: '2 hours ago' },
];

const ATTENDANCE = [
    { name: 'Idara Nnamso', date: 'Mar 14, 2024', checkIn: '8:30 AM', checkOut: '5:15 AM', status: 'Present' },
    { name: 'Collins Emelumba', date: 'Mar 13, 2024', checkIn: '6:40 AM', checkOut: '8:15 AM', status: 'Present' },
    { name: 'Collins Echeng', date: 'Mar 12, 2024', checkIn: '8:45 AM', checkOut: '6:15 AM', status: 'Absent' },
    { name: 'Jacinta Bisong', date: 'Mar 12, 2024', checkIn: '7:50 AM', checkOut: '5:10 PM', status: 'Present' },
    { name: 'Williams Elon', date: 'Mar 11, 2024', checkIn: '6:40 AM', checkOut: '7:00 AM', status: 'Present' },
];

const STAT = [
    { text: '12 new resume', className: 'new-resume' },
    { text: '6 late', className: 'late' },
    { text: '14 absent', className: 'absence' },
];

const SUMMARY = ['70.3%', '48.5%', '94.9%', '94.9%'];

const NotificationsModal = ({ show, onHide }) => (
    <Modal size="lg" aria-labelledby="notifications-title" centered show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title id="notifications-title">Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="modal-activity-list">
                {ACTIVITIES.map((item) => (
                    <div key={item.id} className="activity-item">
                        <p className="activity-category">{item.category}</p>
                        <p>{item.message}</p>
                        <span className="activity-time">{item.time}</span>
                    </div>
                ))}
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
);

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [modalShow, setModalShow] = useState(false);

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
            legend: { position: 'right', labels: { usePointStyle: true, font: { size: 14 } } },
            tooltip: { callbacks: { label: ctx => `${ctx.label}: ${ctx.parsed ?? ''}` } }
        }
    };

    const attendanceChartData = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        datasets: [{ label: 'Hours', data: [7, 8, 6, 8, 7, 9], backgroundColor: '#6A5ACD', borderRadius: 5 }]
    };

    const attendanceChartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Real Time Attendance', font: { size: 16, weight: 'bold' } }
        },
        scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, grid: { display: false }, ticks: { callback: v => `${v}h` } }
        }
    };

    const currentDate = new Date().toLocaleDateString(undefined, {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="dashboard-layout">
            <button onClick={() => setMenuOpen(true)} className="menu-toggle-button" aria-label="Open menu">☰</button>
            <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

            <div className={`content-area ${menuOpen ? 'with-sidebar-open' : ''}`}>
                <header className="dashboard-header">
                    <div className="header-left">
                        <Link to="/" className="hr-logo">
                            <img src={Nugi} alt="Nugi Logo" height={40} />
                        </Link>
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} />
                            <input type="text" placeholder="Search here" />
                        </div>
                    </div>
                    <div className="header-right">
                        <span className="current-date">{currentDate}</span>
                        <Link to="/message"><FontAwesomeIcon icon={faBell} className="header-icon" /></Link>
                        <Link to="/profile"><FontAwesomeIcon icon={faUserCircle} className="header-icon" /></Link>
                    </div>
                </header>

                <main className="main-content">
                    <section className="welcome-section">
                        <div className="welcome-card card">
                            <h2>Welcome to Admin dashboard, Idara!</h2>
                            <div className="announcement-stats">
                                {STAT.map((stat, i) => (
                                    <div key={i} className={`stat-item ${stat.className}`}>
                                        <span className="stat-value">{stat.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="employee-manage-card card">
                            <h3>Manage Employee</h3>
                            <div className="employee-chart-container">
                                <div className="chart-wrapper"><Doughnut data={employeeData} options={employeeOptions} /></div>
                                <div className="employee-stats">
                                    {employeeData.labels.map((label, index) => (
                                       <p key={label}>
                                           <span className={`dot ${label.toLowerCase().replace(' ', '-')}`} />
                                           {label}: {employeeData.datasets[0].data[index]}
                                       </p>
                                    ))}
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
                            {SUMMARY.map((percent, i) => (
                                <li key={i}><span>{percent}</span></li>
                            ))}
                        </div>
                    </section>

                    <section className="attendance-table card">
                        <h3>Attendance Report</h3>
                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr><th>Name</th><th>Date</th><th>Check-In</th><th>Check-Out</th><th>Status</th></tr>
                                </thead>
                                <tbody>
                                    {ATTENDANCE.map((att, i) => (
                                        <tr key={i}>
                                            <td>{att.name}</td>
                                            <td>{att.date}</td>
                                            <td>{att.checkIn}</td>
                                            <td>{att.checkOut}</td>
                                            <td>{att.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                <aside className="right-sidebar">
                    <h3>Last activities</h3>
                    <Button variant="primary" className="mb-3" onClick={() => setModalShow(true)}>View Notifications</Button>
                    <div className="activity-list">
                        {ACTIVITIES.map((item) => (
                            <div key={item.id} className="activity-item">
                                <p className="activity-category">{item.category}</p>
                                <p>{item.message}</p>
                                <span className="activity-time">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>

            <NotificationsModal show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
}
