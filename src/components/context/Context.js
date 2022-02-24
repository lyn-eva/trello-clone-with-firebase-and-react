import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

const trelloContext = createContext();

export const useTrello = () => {
  return useContext(trelloContext);
};

function Context({children}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [bg, setBg] = useState("#0079bf");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user.email)
    })
  }, [])

  const normalSignUp = (email, pwd) => {
    return createUserWithEmailAndPassword(auth, email, pwd);
  }

  const normalSignIn = (email, pwd) => {
    return signInWithEmailAndPassword(auth, email, pwd);
  }

  const value = {
    useTrello,
    BG_THEME: bg,
    setBg,
    normalSignUp,
    normalSignIn
  };

  return (
    <trelloContext.Provider value={value}>{children}</trelloContext.Provider>
  );
}

export default Context;
