import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


export const loadFirebaseConfiguration = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    global.dbCon = getFirestore();
  };

  const firebaseConfig = {

    apiKey: "AIzaSyCIf2v5jQ2VJBl9eGXLgSFPpJBOcFyWgw8",
    authDomain: "testinsercionjson.firebaseapp.com",
    projectId: "testinsercionjson",
    storageBucket: "testinsercionjson.appspot.com",
    messagingSenderId: "75693568897",
    appId: "1:75693568897:web:cc2531e471b91af0adee80",
    measurementId: "G-J94ZZ61WBV"
  };