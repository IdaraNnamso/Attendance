import { Link } from 'react-router-dom';
import '../css/s&t.css';

export default function Sat() {
  return (
    <div className="split-screen">
      <Link to="/sign" className="left-side link-box">
        <h2>Student</h2>
      </Link>

      <Link to="/login" className="right-side link-box">
        <h2>Admin</h2>
      </Link>
    </div>
  );
}
