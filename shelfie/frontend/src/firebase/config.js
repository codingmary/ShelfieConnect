// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";
import { firebaseConfiguration } from "../config/environment";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = firebaseConfiguration

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore()

const storage = getStorage();

const auth = getAuth();

export { db, storage, auth };