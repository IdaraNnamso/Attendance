import { Link } from "react-router-dom";
import '../css/login.css';

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-split">
        <div className="left-image">
          {/* Optional text or logo over image */}
          <div className="overlay-text"></div>
        </div>

        <div className="right-form">
          <div className="glass-card">
            <h1>Create an account</h1>
            <input type="text" placeholder="Username" className="input-field" />
            <input type="email" placeholder="Email" className="input-field" />
            <input type="tel" placeholder="Phone No." className="input-field" />
            <input type="password" placeholder="Password" className="input-field" />

            <Link to="/face">
              <button className="submit-btn">Sign up</button>
            </Link>

            <div className="btn-section">
              <Link to="/" className="clean-link">
                <p className="text3">Forgot password?</p>
              </Link>
              <Link to="/login" className="clean-link">
                <p className="text3">Login</p>
              </Link>  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
