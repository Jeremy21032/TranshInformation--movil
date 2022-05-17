import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const loadFirebaseConfiguration = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    global.dbCon = getFirestore();
  };

  const firebaseConfig = {
    apiKey: "AIzaSyCOl6q0rwro44q51gAuUEgU8TzmrYGxok0",
    authDomain: "titest-50d69.firebaseapp.com",
    projectId: "titest-50d69",
    storageBucket: "titest-50d69.appspot.com",
    messagingSenderId: "1034055353174",
    appId: "1:1034055353174:web:9af875ee540e4a43464cf7",
    measurementId: "G-VEFBBR7L6N"
  };