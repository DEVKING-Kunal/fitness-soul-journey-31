
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
// Replace these with your actual Firebase project credentials
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForLovableAppNeedsToBeReplaced",
  authDomain: "fitness-soul-demo.firebaseapp.com",
  projectId: "fitness-soul-demo",
  storageBucket: "fitness-soul-demo.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
