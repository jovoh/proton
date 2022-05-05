import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA621JA_V66XkTQnjWubFDs-eP6Qu5j5zo",
    authDomain: "fir-tutorial-79662.firebaseapp.com",
    projectId: "fir-tutorial-79662",
    storageBucket: "fir-tutorial-79662.appspot.com",
    messagingSenderId: "725937752543",
    appId: "1:725937752543:web:42420785ec8e76e249dc6a",
    measurementId: "G-CLSYLNN62Y"
  };

  const apps = initializeApp(firebaseConfig);

  export const db = getFirestore();
