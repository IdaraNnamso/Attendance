import { useState } from 'react';
import { Link } from 'react-router-dom'; 
import viteLogo from '/vite.svg';
import '../css/dash.css';
import Sidebar from '../components/sidebar';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

function App() {
  const [User] = useState('Idara');

  const [summaryData] = useState({
    present: 215,
    late: 12,
    absent: 5,
  });

  const [recentAttendance] = useState([
    { name: 'Idara Nnamso', date: 'Mar 14, 2024', checkIn: '8:30 AM', checkOut: '5:15 AM', status: 'Present' },
    { name: 'Collins Emelumba', date: 'Mar 13, 2024', checkIn: '6:40 AM', checkOut: '8:15 AM', status: 'Present' },
    { name: 'Collins Echeng', date: 'Mar 12, 2024', checkIn: '8:45 AM', checkOut: '6:15 AM', status: 'Absent' },
    { name: 'Jacinta Bisong', date: 'Mar 12, 2024', checkIn: '7:50 AM', checkOut: '5:10 PM', status: 'Present' },
    { name: 'Williams Elon', date: 'Mar 11, 2024', checkIn: '6:40 AM', checkOut: '7:00 AM', status: 'Present' },
    { name: 'Cristiano Ronaldo', date: 'Mar 10, 2024', checkIn: '6:50 AM', checkOut: '5:45 PM', status: 'Present' },
    { name: 'Elon Musk', date: 'Mar 10, 2024', checkIn: '7:40 AM', checkOut: '4:20 PM', status: 'Late' },
    { name: 'Jun Young-Hyun', date: 'Mar 10, 2024', checkIn: '9:45 AM', checkOut: '8:20 AM', status: 'Present' },
  ]);

  return (
    <div className="dashboard-layout">
      <Sidebar/>


      <main className="main-content">
        <header className="dashboard-header">
          <h1>Attendance</h1>
          {/* <Link to="/profile" className="user-icon-link">
  <div className="user-icon"></div>
</Link> */}
      
        
        </header>

        <section className="summary-cards">
          <div className="card present">✅ Present {summaryData.present}</div>
          <div className="card late">🕒 Late {summaryData.late}</div>
          <div className="card absent">❌ Absent {summaryData.absent}</div>
        </section>

        <section className="attendance-table">
          <h3>Attendance Report</h3>
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
                   <td>{record.checkOut}</td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default App;
