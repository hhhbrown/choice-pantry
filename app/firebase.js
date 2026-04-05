// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZSLkWcXw4hUKc7LRrr5C_GfpxpV1EUSc",
  authDomain: "youcode-a8a84.firebaseapp.com",
  projectId: "youcode-a8a84",
  storageBucket: "youcode-a8a84.firebasestorage.app",
  messagingSenderId: "782441414325",
  appId: "1:782441414325:web:1e4631cf56d3c30630c8fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };