// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHm8ymvSYWve7hZNRF01__oBAUVoybpvs",
  authDomain: "social-blog-8e521.firebaseapp.com",
  projectId: "social-blog-8e521",
  storageBucket: "social-blog-8e521.appspot.com",
  messagingSenderId: "203143890428",
  appId: "1:203143890428:web:7f14136e8e53ea9bfa9e79",
  measurementId: "G-XY1C16YZKJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
