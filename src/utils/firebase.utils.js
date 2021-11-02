// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDr1uQxnzAgzJ_hTHM2wE2q_lLLkUobGxo",
    authDomain: "firetask-uwp.firebaseapp.com",
    projectId: "firetask-uwp",
    storageBucket: "firetask-uwp.appspot.com",
    messagingSenderId: "1049296552649",
    appId: "1:1049296552649:web:66993c9547148ba80b0318"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
export const auth = getAuth(app);
export const firestore = getFirestore(app);