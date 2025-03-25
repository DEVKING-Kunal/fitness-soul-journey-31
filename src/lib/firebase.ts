
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration with your updated API key
const firebaseConfig = {
  apiKey: "AIzaSyAQEnedtvLQOrbjdM9R9Dnm6m2y_NRgTfo",
  authDomain: "fitness-soul.firebaseapp.com",
  projectId: "fitness-soul",
  storageBucket: "fitness-soul.appspot.com", // corrected storageBucket URL
  messagingSenderId: "575592492168",
  appId: "1:575592492168:web:7cb21cdd85e5e6ae6f833d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
