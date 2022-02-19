import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPP6u3oA2ffqVzgughf637ruvE8R2DiLY",
  authDomain: "authentication-73b37.firebaseapp.com",
  projectId: "authentication-73b37",
  storageBucket: "authentication-73b37.appspot.com",
  messagingSenderId: "596144458714",
  appId: "1:596144458714:web:a98151d2d0543a6b234ee3",
};

const app = initializeApp(firebaseConfig); // init firebase
const auth = getAuth(app); // init authentication
const db = getFirestore(app); // init database

export {app, auth, db};