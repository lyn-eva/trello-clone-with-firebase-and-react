import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAl4NF33hWFlwVEHEpmKZ4w24pwQAdiFGY",
  authDomain: "trello-clone-91cb2.firebaseapp.com",
  projectId: "trello-clone-91cb2",
  storageBucket: "trello-clone-91cb2.appspot.com",
  messagingSenderId: "364558531880",
  appId: "1:364558531880:web:b3eed22a5fd9f688b7641d"
};

const app = initializeApp(firebaseConfig); // init firebase
const auth = getAuth(app); // init authentication
const db = getFirestore(app); // init database

export { app, auth, db };
