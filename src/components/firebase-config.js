import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
};

const app = initializeApp(firebaseConfig); // init firebase
const auth = getAuth(app); // init authentication
const db = getFirestore(app); // init database

export { app, auth, db };
