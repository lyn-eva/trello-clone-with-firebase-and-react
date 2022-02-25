import { useState, useEffect, createContext, useContext } from "react";
import { auth, authMethods } from "../firebase-config";

const firebaseAuth = createContext();

export const useAuth = () => {
  return useContext(firebaseAuth);
};

export default function AuthContext({ children }) {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = authMethods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user && user);
    });

    return unsubscribe;
  }, []);

  const normalSignUp = (email, pwd) => {
    return authMethods.createUserWithEmailAndPassword(auth, email, pwd);
  };

  const normalSignIn = (email, pwd) => {
    return authMethods.signInWithEmailAndPassword(auth, email, pwd);
  };

  const signOutUser = () => {
    return authMethods.signOut(auth);
  };

  const value = { currentUser, normalSignUp, normalSignIn, signOutUser };

  return (
    <firebaseAuth.Provider value={value}>{children}</firebaseAuth.Provider>
  );
}
