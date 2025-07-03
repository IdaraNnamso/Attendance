import React, { useState } from 'react';
import '../css/App.css';
import { Link } from 'react-router-dom';
import NI from '../assets/NI.png';

const GoogleIcon = () => (
  <svg className="gicon" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512..." />
  </svg>
);

const GithubIcon = () => (
  <svg className="ghicon" viewBox="0 0 496 512">
    <path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6..." />
  </svg>
);

const LoginForm = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const showCustomAlert = (msg) => {
    setMessage(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const handleLogin = () => {
    const dummyUser = {
      email: 'Excellencennamso@gmail.com',
      pass: 'kolawole@321'
    };

    if (email === dummyUser.email && pass === dummyUser.pass) {
      showCustomAlert('Login successful!');
      setTimeout(() => {
        window.location.href = '/menu';
      }, 2000);
    } else {
      showCustomAlert('Invalid credentials.');
    }
  };

  return (
    <div className="loginBox">
      {showAlert && <div className="popmsg">{message}</div>}
      <h2 className="formtitle">Welcome Back</h2>
      <p className="formnote">Enter your credentials to access your account.</p>
      <div className="loginBlob">
        <label className="formlabel">Email Address</label>
        <input className="formipt" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="loginBlob">
        <label className="formlabel">Password</label>
        <input className="formipt" type="password" placeholder="••••••••••" value={pass} onChange={e => setPass(e.target.value)} />
        <a href="#" className="forgotlink">Forgot Password?</a>
      </div>
      <div className="btnwrap">
        <button className="btn btnloud" type="button" onClick={handleLogin}>Log In</button>
      </div>
      <div className="toggleform">
        <p>Don't have an account? <button onClick={() => setFormType('signup')} className="formlink">Sign Up</button></p>
      </div>
    </div>
  );
};

const SignupForm = ({ setFormType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const showCustomAlert = (msg) => {
    setMessage(msg);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2500);
  };

  const handleSignup = () => {
    showCustomAlert('Account created!');
    setTimeout(() => {
      window.location.href = '/menu';
    }, 2000);
  };

  return (
    <div className="loginBox">
      {showAlert && <div className="popmsg">{message}</div>}
      <h2 className="formtitle">Create an Account</h2>
      <p className="formnote">Start your journey with us today.</p>
      <div className="loginBlob">
        <label className="formlabel">Full Name</label>
        <input className="formipt" type="text" placeholder="Akpan Idara" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="loginBlob">
        <label className="formlabel">Email Address</label>
        <input className="formipt" type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="loginBlob">
        <label className="formlabel">Password</label>
        <input className="formipt" type="password" placeholder="••••••••••" value={pass} onChange={e => setPass(e.target.value)} />
      </div>
      <div className="btnwrap">
        <button className="btn btnloud" type="button" onClick={handleSignup}>Sign Up</button>
      </div>
      <div className="toggleform">
        <p>Already have an account? <button onClick={() => setFormType('login')} className="formlink">Log In</button></p>
      </div>
    </div>
  );
};

export default function App() {
  const [formType, setFormType] = useState('login');

  return (
    <div className="mainshell">
      <div className="sidepic">
        <img src={NI} alt="Logo" className="tinylogo" />
        <div className="sidewords">
          <h2 className="bigtext">Unlock Your Potential.</h2>
          <p className="subtext">Join a community of builders and creators. Sign in to continue your journey.</p>
        </div>
        <div className="copybit">&copy; 2025 Nugi Innovations Inc. All Rights Reserved.</div>
      </div>

      <div className="formside">
        <div className="formcard">
          {formType === 'login' ? <LoginForm setFormType={setFormType} /> : <SignupForm setFormType={setFormType} />}
          <div className="formsplit">
            <div className="splitline"></div>
            <span className="splitword">Or continue with</span>
            <div className="splitline"></div>
          </div>
          <div className="socialbtns">
            <button className="btn btnsoft"><GoogleIcon /> Continue with Google</button>
            <button className="btn btnsoft"><GithubIcon /> Continue with GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
