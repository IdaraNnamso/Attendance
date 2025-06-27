import React, { useState } from 'react';
import '../css/app.css';
import { Link } from 'react-router-dom';
import NI from '../assets/NI.png';

const GoogleIcon = () => (
  <svg className="icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.3 512 0 398.5 0 256S111.3 0 244 0c73 0 134.3 29.5 175.8 68.5l-64.3 62.4C330.3 103.5 292.3 84 244 84c-83.2 0-151.2 67.2-151.2 150s68 150 151.2 150c95.5 0 131.7-62.3 136.8-95.2H244v-75.5h236.4c2.5 13.5 3.6 28.5 3.6 44.3z"></path>
  </svg>
);

const GithubIcon = () => (
  <svg className="icon" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-6-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.3-6.2-10.1-27.8 2.3-57.4 0 0 21.9-7 72.1 25.6 20.9-6.2 43.7-9.4 66.5-9.4 22.8 0 45.6 3.1 66.5 9.4 50.2-32.6 72.1-25.6 72.1-25.6 12.4 29.6 4.6 51.2 2.3 57.4 16 17.6 23.6 31.4 23.6 58.9 0 96.5-56.4 104.2-112.6 110.5 9.1 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);

const LoginForm = ({ setFormType }) => (
  <div className="form-container">
    <h2 className="form-title">Welcome Back</h2>
    <p className="form-subtitle">Enter your credentials to access your account.</p>
    <form>
      <div className="input-group">
        <label className="form-label" htmlFor="login-email">Email Address</label>
        <input className="form-input" id="login-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="input-group">
        <label className="form-label" htmlFor="login-password">Password</label>
        <input className="form-input" id="login-password" type="password" placeholder="••••••••••" />
        <a href="#" className="form-link-forgot">Forgot Password?</a>
      </div>
      <div className="button-group">
        <Link to='/menu'>
             <button className="btn btn-primary" type="button">Log In</button>
        </Link>
   </div>
    </form>
    <div className="form-switch">
      <p>
        Don't have an account?{' '}
        <button onClick={() => setFormType('signup')} className="form-link-switch">Sign Up</button>
      </p>
    </div>
  </div>
);

const SignupForm = ({ setFormType }) => (
  <div className="form-container">
    <h2 className="form-title">Create an Account</h2>
    <p className="form-subtitle">Start your journey with us today.</p>
    <form>
      <div className="input-group">
        <label className="form-label" htmlFor="signup-name">Full Name</label>
        <input className="form-input" id="signup-name" type="text" placeholder="Akpan Idara" />
      </div>
      <div className="input-group">
        <label className="form-label" htmlFor="signup-email">Email Address</label>
        <input className="form-input" id="signup-email" type="email" placeholder="you@example.com" />
      </div>
      <div className="input-group">
        <label className="form-label" htmlFor="signup-password">Password</label>
        <input className="form-input" id="signup-password" type="password" placeholder="••••••••••" />
      </div>
      <div className="button-group">
        <Link to='/menu'>
           <button className="btn btn-primary" type="button">Sign Up</button>
        </Link>
     
      </div>
    </form>
    <div className="form-switch">
      <p>
        Already have an account?{' '}
        <button onClick={() => setFormType('login')} className="form-link-switch">Log In</button>
      </p>
    </div>
  </div>
);

export default function App() {
  const [formType, setFormType] = useState('login');

  return (
    <div className="entry-page">
      <div className="branding-panel">
        <img src={NI} alt="Logo" className="branding-logo" />
        <div className="branding-content">
          <h2 className="branding-heading">Unlock Your Potential.</h2>
          <p className="branding-subheading">
            Join a community of builders and creators. Sign in to continue your journey.
          </p>
        </div>
        <div className="branding-footer">
          &copy; 2025 Nugi Innovations Inc. All Rights Reserved.
        </div>
      </div>

      <div className="form-panel">
        <div className="form-wrapper">
          {formType === 'login' ? <LoginForm setFormType={setFormType} /> : <SignupForm setFormType={setFormType} />}
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">Or continue with</span>
            <div className="divider-line"></div>
          </div>
          <div className="social-login-group">
            <button className="btn btn-social">
              <GoogleIcon />
              Continue with Google
            </button>
            <button className="btn btn-social">
              <GithubIcon />
              Continue with GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
