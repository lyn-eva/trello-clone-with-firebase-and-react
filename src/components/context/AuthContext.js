import { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase-config";

const firebaseAuth = createContext();

export const useAuth = () => {
  return useContext(firebaseAuth);
};

export default function AuthContext({ children }) {
  const [currentUser, setcurrentUser] = useState({});

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => setcurrentUser(user));

    return unsubAuth;
  }, []);

  const normalSignUp = (email, pwd) => {
    return createUserWithEmailAndPassword(auth, email, pwd);
  };

  const normalSignIn = (email, pwd) => {
    return signInWithEmailAndPassword(auth, email, pwd);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateDisplayName = (username) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
    });
  };

  const resetPwd = () => {
    sendPasswordResetEmail(auth, currentUser.email);
  };

  const deleteAccount = () => {
    return deleteUser(currentUser);
  };

  const value = {
    currentUser,
    normalSignUp,
    normalSignIn,
    signOutUser,
    updateDisplayName,
    resetPwd,
    deleteAccount,
  };

  return <firebaseAuth.Provider value={value}>{children}</firebaseAuth.Provider>;
}
