import React, { useEffect, useRef, useState, useCallback } from 'react';

// Main App component for face scanning
function Face() {
  const videoRef = useRef(); // Reference to the video element for camera stream
  const [scanningStarted, setScanningStarted] = useState(false); // State to track if scanning has started
  const [scanningComplete, setScanningComplete] = useState(false); // State to manage scan status (true after timer)
  const [showModal, setShowModal] = useState(false); // State to control visibility of the custom alert modal
  const [modalMessage, setModalMessage] = useState(''); // State to hold the message for the custom alert modal
  const timerRef = useRef(null); // Reference to store the setTimeout ID for cleanup
  const SCAN_DURATION = 3000; // 3 seconds for scanning simulation

  // Function to start the camera stream
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanningStarted(true); // Indicate that camera is active and scanning can conceptually start
        // The onPlay event handler will be triggered once the video starts playing
      }
    } catch (err) {
      console.error('Camera access error:', err);
      // Display camera access error in custom modal
      setModalMessage('Failed to access camera. Please ensure camera permissions are granted and no other application is using the camera.');
      setShowModal(true);
      setScanningComplete(true); // Indicate that scanning can't proceed without camera
      setScanningStarted(false); // Reset scanning started if camera fails
    }
  };

  // useEffect hook for initial setup (starting camera)
  useEffect(() => {
    startCamera(); // Attempt to start the camera

    // Cleanup function for useEffect:
    // This runs when the component unmounts or before the effect re-runs if dependencies change.
    return () => {
      // Clear the timer if it's running
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Stop the camera stream to release resources
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Callback function to handle video playing and start the simulated scan timer
  const handleVideoPlay = useCallback(() => {
    // Only start the timer if camera is active and scanning isn't already complete
    if (scanningStarted && !scanningComplete) {
      timerRef.current = setTimeout(() => {
        // After the duration, simulate successful detection
        setModalMessage('Attendance recorded successfully!'); // Changed message to reflect attendance
        setShowModal(true); // Show the success message
        setScanningComplete(true); // Mark scanning as complete
        
        // Stop the video stream after simulated detection
        if (videoRef.current) {
          videoRef.current.pause();
          // Optionally, to completely stop the camera:
          if (videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
          }
        }
      }, SCAN_DURATION); // Timer based on SCAN_DURATION
    }
  }, [scanningStarted, scanningComplete]); // Re-run if scanningStarted or scanningComplete changes

  // Custom Modal Component (instead of alert())
  const CustomModal = ({ message, onClose }) => {
    if (!showModal) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p>{message}</p>
          <button onClick={onClose} className="modal-close-btn">
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>
        {`
          /* General styling for html, body, and root elements for consistent layout */
          html, body {
              height: 100%; /* Ensure html and body take full viewport height */
              margin: 0; /* Remove default margins */
              padding: 0; /* Remove default padding */
              box-sizing: border-box; /* Global box-sizing for easier layout */
          }

          *, *::before, *::after {
              box-sizing: inherit; /* Inherit box-sizing for all elements */
          }

          body {
              font-family: 'Inter', sans-serif; /* Using Inter font as default */
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              background-color: #f0f2f5; /* Light background */
              
              /* Improved centering for single main content block */
              display: grid; /* Use CSS Grid for robust centering */
              place-items: center; /* Centers content both horizontally and vertically */
              
              min-height: 100vh; /* Ensure it takes full viewport height */
              color: #333;
              overflow: auto; /* Allow scrolling if content exceeds viewport height */
          }

          /* Container for the main face scanning page */
          .face-page {
              display: flex;
              flex-direction: column;
              align-items: center; /* Center children (h1, p, video-box) horizontally within face-page */
              padding: 20px;
              width: 100%; /* Take full width on smaller screens */
              max-width: 800px; /* Limit max width on larger screens */
              margin: 20px auto; /* Add vertical margin to separate from top/bottom of screen if not perfectly centered */
              text-align: center; /* Center text within face-page */
              background-color: #ffffff; /* Add a background to the main content area */
              border-radius: 15px; /* Rounded corners for the main content area */
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1); /* Subtle shadow for the content box */
              z-index: 1; /* Ensure face-page is above the background, important with modals */
          }

          .face-page h1 {
              color: #2c3e50;
              margin-bottom: 15px;
              font-size: 2.5em;
              font-weight: 700;
          }

          .face-page p {
              font-size: 1.2em;
              margin-bottom: 30px;
              color: #555;
          }

          /* Video stream container */
          .video-box {
              position: relative;
              width: 640px; /* Fixed width for video */
              height: 480px; /* Fixed height for video */
              border: 3px solid #007bff; /* Blue border */
              border-radius: 12px; /* Rounded corners */
              overflow: hidden; /* Ensures content respects border-radius */
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25); /* Stronger shadow for depth */
              background-color: #000; /* Black background if video not loaded */
              display: flex; /* Use flex to center video inside if needed */
              justify-content: center;
              align-items: center;
          }

          /* Video element styling */
          .video-stream {
              width: 100%;
              height: 100%;
              object-fit: cover; /* Ensures video fills container without distortion */
              display: block; /* Removes extra space below video */
              border-radius: 9px; /* Slightly less than parent for inner shadow effect */
              transform: scaleX(-1); /* Flips the video horizontally to correct inversion */
          }

          /* Custom Modal Styling (replaces browser's alert) */
          .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 1000; /* Ensure modal is on top */
          }

          .modal-content {
              background-color: #ffffff;
              padding: 30px;
              border-radius: 15px; /* Rounded corners for modal */
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
              text-align: center;
              max-width: 400px;
              width: 90%;
              animation: fadeIn 0.3s ease-out; /* Simple fade-in animation */
          }

          .modal-content p {
              font-size: 1.3em;
              margin-bottom: 25px;
              color: #333;
          }

          .modal-close-btn {
              background-color: #007bff;
              color: white;
              border: none;
              padding: 12px 25px;
              border-radius: 8px; /* Rounded button */
              cursor: pointer;
              font-size: 1.1em;
              font-weight: 600;
              transition: background-color 0.2s ease, transform 0.1s ease;
              box-shadow: 0 4px 10px rgba(0, 123, 255, 0.3);
          }

          .modal-close-btn:hover {
              background-color: #0056b3;
              transform: translateY(-2px); /* Slight lift on hover */
          }

          .modal-close-btn:active {
              background-color: #004085;
              transform: translateY(0);
          }

          /* Keyframe animation for modal */
          @keyframes fadeIn {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
          }

          /* Responsive adjustments for smaller screens */
          @media (max-width: 768px) {
              .face-page h1 {
                  font-size: 2em;
              }

              .face-page p {
                  font-size: 1em;
              }

              .video-box {
                  width: 90vw; /* Occupy 90% of viewport width */
                  height: calc(0.75 * 90vw); /* Maintain 4:3 aspect ratio (480/640 = 0.75) */
                  max-width: 640px; /* But don't exceed original max width */
                  max-height: 480px; /* And don't exceed original max height */
              }

              .modal-content {
                  padding: 20px;
              }

              .modal-content p {
                  font-size: 1.1em;
              }
          }

          @media (max-width: 480px) {
              .face-page h1 {
                  font-size: 1.8em;
              }

              .face-page p {
                  font-size: 0.9em;
              }
          }
        `}
      </style>
      <div className="face-page">
        <h1>Face Scanner</h1>
        {/* Display messages based on loading and scanning status */}
        {!scanningStarted ? (
          <p>Initializing camera...</p>
        ) : scanningComplete ? (
          <p>Scan Complete!</p>
        ) : (
          <p>Scanning in progress... Please wait.</p>
        )}

        <div className="video-box">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline // Essential for mobile browsers to allow autoplay and inline playback
            width="640"
            height="480"
            onPlay={handleVideoPlay} // Trigger timer when video starts playing
            className="video-stream"
          />
        </div>

        {/* Render the custom modal */}
        <CustomModal message={modalMessage} onClose={() => setShowModal(false)} />
      </div>
    </>
  );
}

export default Face;
