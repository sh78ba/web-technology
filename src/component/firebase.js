// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPXzdqKh2-m5NkAcvQ6MgGSDVAEjt1Ed8",
  authDomain: "webdev-add50.firebaseapp.com",
  projectId: "webdev-add50",
  storageBucket: "webdev-add50.appspot.com",
  messagingSenderId: "351822372200",
  appId: "1:351822372200:web:450052f76bb1bb2ba10add"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);