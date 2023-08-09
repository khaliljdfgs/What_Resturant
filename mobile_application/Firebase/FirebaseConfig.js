// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAAHmfRbcJAHXSFFLbSRTJbR0a77_GpVGc",
    authDomain: "whatrestaurant.firebaseapp.com",
    projectId: "whatrestaurant",
    storageBucket: "whatrestaurant.appspot.com",
    messagingSenderId: "745422192214",
    appId: "1:745422192214:web:177c678a0e3d1fa3d545f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
