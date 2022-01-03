// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDfWmLBpbFyzd5TluGQl_y3tEMTwps_-I",
  authDomain: "critique-hall.firebaseapp.com",
  projectId: "critique-hall",
  storageBucket: "critique-hall.appspot.com",
  messagingSenderId: "20929041336",
  appId: "1:20929041336:web:f36f3a2794e4100b83b54d",
  measurementId: "G-FKKQECPP32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);