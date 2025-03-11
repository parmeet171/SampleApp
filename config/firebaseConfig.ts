// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIYR5PMgtpATQEzklBmjH6kbylQJzs0I8",
  authDomain: "react-native-project-6091e.firebaseapp.com",
  projectId: "react-native-project-6091e",
  storageBucket: "react-native-project-6091e.firebasestorage.app",
  messagingSenderId: "917409059249",
  appId: "1:917409059249:web:0b38cff13cc2b212bf6d90"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app); 