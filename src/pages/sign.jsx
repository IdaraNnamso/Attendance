import React, { useRef } from 'react';
import '../css/signup.css';

const sign = () => {
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const handleRegister = () => {
    // Implement face registration logic here
    console.log('Registering face...');
  };

  return (
    <div className="register-container">
      <h1>Face Recognition</h1>
      <p>Sign up by registering your face.</p>

      <div className="video-wrapper">
        <video ref={videoRef} autoPlay playsInline muted />
        <div className="face-outline" />
      </div>

      <button onClick={startCamera} className="btn start">Start Camera</button>
      <button onClick={handleRegister} className="btn register">Register</button>
    </div>
  );
};

export default sign;
