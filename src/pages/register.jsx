import React, { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaCamera, FaSave, FaRedo } from 'react-icons/fa';
import Sidebar from '../components/sidebar';
import Webcam from 'react-webcam';
import '../css/register.css';

export default function RegisterFace() {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanning, setScanning] = useState(true);

  // Auto-capture after delay (simulate scanning)
  useEffect(() => {
    if (scanning) {
      const timer = setTimeout(() => {
        capture();
        setScanning(false);
      }, 5000); // 4 seconds scan delay
      return () => clearTimeout(timer);
    }
  }, [scanning]);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  return (
    <div className="dashboard-layouts">
      <Sidebar />

      <div className="register-content">
        <div className="register-header">
          <h1>Face Scanning</h1>
        </div>

        <div className="register-body">
          {!capturedImage ? (
            <div className="webcam-wrapper scanning-mode">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="webcam-feed"
                audio={false}
              />
              <div className="scan-overlay">
                <div className="scan-line" />
              </div>
              <p className="scanning-text">Scanning your face, please stay still...</p>
            </div>
          ) : (
            <div className="image-preview">
              <img src={capturedImage} alt="Captured face" />
              <div className="btn-group">
                <button onClick={() => {
                  setCapturedImage(null);
                  setScanning(true);
                }} className="btn">
                  <FaRedo /> Rescan
                </button>
                <button className="btn save-btn">
                  <FaSave /> Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
