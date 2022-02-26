import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBdxuFM233QPIPsxjRFloWuj4OLdpm9V0",
  authDomain: "trello-development.firebaseapp.com",
  projectId: "trello-development",
  storageBucket: "trello-development.appspot.com",
  messagingSenderId: "909718593209",
  appId: "1:909718593209:web:84d8038e3cc78fe8694568",
};

const app = initializeApp(firebaseConfig); // init firebase
const auth = getAuth(app); // init authentication
const db = getFirestore(app); // init database

export { app, auth, db };
