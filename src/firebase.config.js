// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnlae2fnoEHCvYaWJoe8qPF9QWJqaBgfk",
  authDomain: "job-application-85e35.firebaseapp.com",
  projectId: "job-application-85e35",
  storageBucket: "job-application-85e35.firebasestorage.app",
  messagingSenderId: "838137365301",
  appId: "1:838137365301:web:2afe0be5c42823fac9027c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;