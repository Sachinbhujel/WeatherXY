import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyD0LmKjOKFD1TNyTj7PxmExFBRMWPTcGmU",
  authDomain: "login-d6dd1.firebaseapp.com",
  projectId: "login-d6dd1",
  storageBucket: "login-d6dd1.firebasestorage.app",
  messagingSenderId: "558923184944",
  appId: "1:558923184944:web:ee815cb39307a9e60826f5",
  measurementId: "G-CJX0Z8QDD4"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 

export { auth };