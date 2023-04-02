// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: "pr-eshop.firebaseapp.com",
  projectId: "pr-eshop",
  storageBucket: "pr-eshop.appspot.com",
  messagingSenderId: "1046073902349",
  appId: "1:1046073902349:web:06cfd27da97ffc876a5c44",
  measurementId: "G-YET5PPNNLS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app; 