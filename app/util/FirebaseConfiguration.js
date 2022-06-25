import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const loadFirebaseConfiguration = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    global.dbCon = getFirestore();
  };

  const firebaseConfig = {
    // apiKey: "AIzaSyCOl6q0rwro44q51gAuUEgU8TzmrYGxok0",
    // authDomain: "titest-50d69.firebaseapp.com",
    // projectId: "titest-50d69",
    // storageBucket: "titest-50d69.appspot.com",
    // messagingSenderId: "1034055353174",
    // appId: "1:1034055353174:web:9af875ee540e4a43464cf7",
    // measurementId: "G-VEFBBR7L6N"
    apiKey: "AIzaSyCIf2v5jQ2VJBl9eGXLgSFPpJBOcFyWgw8",
    authDomain: "testinsercionjson.firebaseapp.com",
    projectId: "testinsercionjson",
    storageBucket: "testinsercionjson.appspot.com",
    messagingSenderId: "75693568897",
    appId: "1:75693568897:web:cc2531e471b91af0adee80",
    measurementId: "G-J94ZZ61WBV"
  };