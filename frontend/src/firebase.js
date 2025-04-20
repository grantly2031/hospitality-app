// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC2baM4rZz5ndMmDMHkI2xD3IsomoGEL58",
  authDomain: "hospitally-app-chat.firebaseapp.com",
  projectId: "hospitally-app-chat",
  storageBucket: "hospitally-app-chat.firebasestorage.app",
  messagingSenderId: "254009258451",
  appId: "1:254009258451:web:6c627797a926cc6c05bf26",
  measurementId: "G-XNTMBNL4SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore
export const db = getFirestore(app);
