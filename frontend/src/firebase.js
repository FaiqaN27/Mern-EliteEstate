// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eliteestate-mern.firebaseapp.com",
  projectId: "eliteestate-mern",
  storageBucket: "eliteestate-mern.firebasestorage.app",
  messagingSenderId: "796239341313",
  appId: "1:796239341313:web:d7b885126c231a50251d00"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);