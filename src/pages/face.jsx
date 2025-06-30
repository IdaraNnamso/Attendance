import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import '../css/face.css';

export default function FacePage() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [registered, setRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = '/models';

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tiny_face_detector'),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/face_landmark_68'),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + '/face_recognition'),
      ]);

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('❌ Camera access error:', err);
        });
    };

    loadModels();
  }, []);

  const handleVideoPlay = () => {
    const intervalId = setInterval(async () => {
      if (!videoRef.current || registered) {
        clearInterval(intervalId);
        return;
      }

      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detections.length > 0 && !registered) {
        setRegistered(true);
        setShowModal(true);
      }

      // Draw detections on canvas
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      faceapi.matchDimensions(canvas, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      const resized = faceapi.resizeResults(detections, {
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight,
      });

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resized);

      if (canvasRef.current) {
        canvasRef.current.innerHTML = '';
        canvasRef.current.appendChild(canvas);
      }
    }, 1000);
  };

  const handleModalOk = () => {
    setShowModal(false);
    navigate('/attendance'); // navigate to attendance page
  };

  return (
    <div className="face-page" style={{ position: 'relative' }}>
      <h2>Face Attendance</h2>

      <div className="video-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          width="640"
          height="480"
          onPlay={handleVideoPlay}
          style={{ position: 'relative', zIndex: 1 }}
        />
        <div
          ref={canvasRef}
          className="overlay-canvas"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 640,
            height: 480,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      </div>

      {/* Modal popup */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '2rem 3rem',
              borderRadius: '10px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
              textAlign: 'center',
            }}
          >
            <h3 style={{ marginBottom: '1rem', color: '#4caf50' }}>✅ Attendance Marked</h3>
            <p>Your attendance has been successfully recorded.</p>
            <button
              onClick={handleModalOk}
              style={{
                marginTop: '1.5rem',
                padding: '0.6rem 2rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#4caf50',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
