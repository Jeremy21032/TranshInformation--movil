import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const loadFirebaseConfiguration = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    global.dbCon = getFirestore();
  };

  const firebaseConfig = {
    apiKey: "XXXXXXXXXXXXXXXXXXX",
    authDomain: "XXXXXXXXXXXXXXXXX",
    projectId: "XXXXXXXXXXXXXXXXXX",
    storageBucket: "XXXXXXXXXXXXXXX",
    messagingSenderId: "XXXXXXXXXXXXXXXXXXX",
    appId: "XXXXXXXXXXXXXXXXXXXXXXX",
    measurementId: "XXXXXXXXX"
  };
