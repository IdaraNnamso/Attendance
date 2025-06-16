// src/pages/Face.jsx
import React, { useEffect, useRef, useState } from 'react';
import { loadModels } from '../api/faceApi';

// import * as faceapi from 'face-api.js';
import '../css/face.css';

export default function Face() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [facesCount, setFacesCount] = useState(0);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await loadModels();
      setModelsLoaded(true);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Camera access error:', err);
      }
    };

    init();
  }, []);

  const handleVideoPlay = () => {
    setInterval(async () => {
      if (!modelsLoaded || !videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors();

      setFacesCount(detections.length);

      const dims = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };

      faceapi.matchDimensions(canvasRef.current, dims);
      const resizedDetections = faceapi.resizeResults(detections, dims);

      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, dims.width, dims.height);

      faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
    }, 100);
  };

  return (
    <div className="face-page">
      <h1>Live Face Detection</h1>
      <p>{facesCount} face(s) detected</p>
      <div className="video-box">
        <video
          ref={videoRef}
          autoPlay
          muted
          width="640"
          height="480"
          onPlay={handleVideoPlay}
          className="video-stream"
        />
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="video-canvas"
        />
      </div>
    </div>
  );
}
