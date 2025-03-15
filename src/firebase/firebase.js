// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyATtSGCwPouUCTPVgmZZ0YKNuOZIJcVBV4",
    authDomain: "insta-clone-4223b.firebaseapp.com",
    projectId: "insta-clone-4223b",
    storageBucket: "insta-clone-4223b.firebasestorage.app",
    messagingSenderId: "918630827398",
    appId: "1:918630827398:web:76df8285e368706ed45807",
    measurementId: "G-NDLX8N4Z8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, Auth, firestore, storage };