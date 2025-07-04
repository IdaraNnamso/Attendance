import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import '../css/face.css';

export default function FacePage() {
  const videoRef = useRef(null);    //creates reference to the video element and also to check if face has been detected
  const canvasRef = useRef(null);    //used for the drawing of the detection boxes and mathe the video layout
  const [registered, setRegistered] = useState(false);   //variable that track if the face has been detected
  const [showModal, setShowModal] = useState(false);     //this is what ci=ontrols when the modal pops up
  const navigate = useNavigate();  //navigate to attendance

  useEffect(() => {
    const MODEL_URL = '/models';

    Promise.all([                                                                  //Promise.all: ensure all models are loaded before proceeding
      faceapi.nets.tinyFaceDetector.loadFromUri(`${MODEL_URL}/tiny_face_detector`),  //fast face detector (detect all face every second)
      faceapi.nets.faceLandmark68Net.loadFromUri(`${MODEL_URL}/face_landmark_68`),    //detect the different face landmarks (68) eg eyes, nose etc
      faceapi.nets.faceRecognitionNet.loadFromUri(`${MODEL_URL}/face_recognition`),    //recognizes and matches face 
    ]).then(() => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => { if (videoRef.current) videoRef.current.srcObject = stream; })
        .catch(err => console.error('❌ Camera access error:', err));                     //ask for permission to access the camera and if granted the stream is sent to the "video element(videoref)
    });
  }, []);




  useEffect(() => {
    const interval = setInterval(async () => {                            //setInterval(...) (set atimer that checks the video feed every second)
      if (!videoRef.current) return;

      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());   //use faceapi to detects all faces in video frame

      if (detections.length > 0 && !registered) {       //if atleast 1 face is detected...
        setRegistered(true);                            //stops checking for face
        setShowModal(true);                             //shows a modal/popup
      }  //ensure the face detections runs when needed and stops after sucess




      const canvas = faceapi.createCanvasFromMedia(videoRef.current);   //creates a canvas that matches the video feed
      faceapi.matchDimensions(canvas, {                                 //resize the internal drawing to fit the video resolution
        width: videoRef.current.videoWidth,
        height: videoRef.current.videoHeight, //actual dimensions of the video while playing
      });
}, 1000);

    return () => clearInterval(interval);
  }, [registered]);

  const handleModalOk = () => {
    const now = new Date();
    const record = {
      id: Date.now(),
      name: 'Akpan Idara',
      profileImg: 'https://i.guim.co.uk/img/media/74587bc9a8a10aad8443241024d558a5eac098d9/0_0_5108_3406/master/5108.jpg?width=465&dpr=1&s=none&crop=none',
      course: 'Computer Science',
      date: now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      timeIn: now.toLocaleTimeString(),
      timeOut: '--',
      status: 'Present',
    };

    const data = JSON.parse(localStorage.getItem('attendanceData')) || [];    //get existing attendance record from local storage and returns a string that converts its into an array using  (JSON.parse)
    localStorage.setItem('attendanceData', JSON.stringify([...data, record]));
//so this basically get the old records from localstorage, add the new attendance to it and save the updated record back into localstorage


    setShowModal(false);
    navigate('/attendance');
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
          width={640}
          height={480}
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

      {showModal && (
        <div
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex', justifyContent: 'center', alignItems: 'center',
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
            <h3 style={{ marginBottom: '1rem', color: '#2e1b5e' }}>✅ Attendance Marked</h3>
            <p>Your attendance has been successfully recorded.</p>
            <button
              onClick={handleModalOk}
              style={{
                marginTop: '1.5rem',
                padding: '0.6rem 2rem',
                border: 'none',
                borderRadius: '5px',
                backgroundColor: '#2e1b5e',
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
