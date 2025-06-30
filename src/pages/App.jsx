import React, { useState } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import NI from '../assets/NI.png';

const GoogleIcon = () => (
  <svg className="icon" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512..." />
  </svg>
);

const GithubIcon = () => (
  <svg className="icon" viewBox="0 0 496 512">
    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6..." />
  </svg>
);

const LoginForm = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = () => {
    const stored = JSON.parse(localStorage.getItem('nugi-user'));
    if (!stored) return alert('No user found.');
    if (stored.email === email && stored.pass === pass) {
      alert('Login successful!');
      window.location.href = '/menu';
    } else {
      alert('Invalid credentials.');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Welcome Back</h2>
      <p className="form-subtitle">Enter your credentials to access your account.</p>
      <div className="input-group">
        <label className="form-label">Email Address</label>
        <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <label className="form-label">Password</label>
        <input className="form-input" type="password" placeholder="••••••••••" value={pass} onChange={e => setPass(e.target.value)} />
        <a href="#" className="form-link-forgot">Forgot Password?</a>
      </div>
      <div className="button-group">
        <button className="btn btn-primary" type="button" onClick={handleLogin}>Log In</button>
      </div>
      <div className="form-switch">
        <p>Don't have an account? <button onClick={() => setFormType('signup')} className="form-link-switch">Sign Up</button></p>
      </div>
    </div>
  );
};

const SignupForm = ({ setFormType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSignup = () => {
    const user = { name, email, pass };
    localStorage.setItem('nugi-user', JSON.stringify(user));
    alert('Account created!');
    window.location.href = '/menu';
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create an Account</h2>
      <p className="form-subtitle">Start your journey with us today.</p>
      <div className="input-group">
        <label className="form-label">Full Name</label>
        <input className="form-input" type="text" placeholder="Akpan Idara" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="input-group">
        <label className="form-label">Email Address</label>
        <input className="form-input" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="input-group">
        <label className="form-label">Password</label>
        <input className="form-input" type="password" placeholder="••••••••••" value={pass} onChange={e => setPass(e.target.value)} />
      </div>
      <div className="button-group">
        <button className="btn btn-primary" type="button" onClick={handleSignup}>Sign Up</button>
      </div>
      <div className="form-switch">
        <p>Already have an account? <button onClick={() => setFormType('login')} className="form-link-switch">Log In</button></p>
      </div>
    </div>
  );
};

export default function App() {
  const [formType, setFormType] = useState('login');

  return (
    <div className="entry-page">
      <div className="branding-panel">
        <img src={NI} alt="Logo" className="branding-logo" />
        <div className="branding-content">
          <h2 className="branding-heading">Unlock Your Potential.</h2>
          <p className="branding-subheading">Join a community of builders and creators. Sign in to continue your journey.</p>
        </div>
        <div className="branding-footer">&copy; 2025 Nugi Innovations Inc. All Rights Reserved.</div>
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
            <button className="btn btn-social"><GoogleIcon /> Continue with Google</button>
            <button className="btn btn-social"><GithubIcon /> Continue with GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
