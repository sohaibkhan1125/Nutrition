// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8h6aB2VA7m9B9oyEJmFQpxLB9-QTPTfY",
  authDomain: "nutrition-a76a2.firebaseapp.com",
  projectId: "nutrition-a76a2",
  storageBucket: "nutrition-a76a2.firebasestorage.app",
  messagingSenderId: "792271765675",
  appId: "1:792271765675:web:7a4408f041db1e29dc37ee",
  measurementId: "G-TVH05BD9R2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
