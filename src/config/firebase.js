
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: "AIzaSyBZisaKDd6aRnGLCQdBsoad-1M1XJ5q9TY",
  authDomain: "scamguard-e21ec.firebaseapp.com",
  projectId: "scamguard-e21ec",
  storageBucket: "scamguard-e21ec.appspot.com",
  messagingSenderId: "694171925456",
  appId: "1:694171925456:web:634e22044bb62f82ac97d5",
  measurementId: "G-BRKCJCC11J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app);


export const analytics = getAnalytics(app);