import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';

export async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tiny_face_detector_model');
  await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/face_landmark_68_model');
  await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL + '/face_recognition_model');
}
