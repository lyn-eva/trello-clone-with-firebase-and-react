import { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase-config";

const firebaseAuth = createContext();

export const useAuth = () => {
  return useContext(firebaseAuth);
};

export default function AuthContext({ children }) {
  const [currentUsername, setCurrentUsername] = useState(null);
  // const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUsername(user?.displayName);
      console.log('auth state changed')
    });

    return unsubAuth;
  }, []);

  // console.log(currentUser)

  const normalSignUp = (email, pwd) => {
    return createUserWithEmailAndPassword(auth, email, pwd);
  };

  const normalSignIn = (email, pwd) => {
    return signInWithEmailAndPassword(auth, email, pwd);
  };

  const signOutUser = () => {
    return signOut(auth);
  };

  const updateUserProfile = (username) => {
    return updateProfile(auth.currentUser, {
      displayName: username,
    });
  };

  const value = {
    currentUsername,
    normalSignUp,
    normalSignIn,
    signOutUser,
    updateUserProfile,
  };

  return (
    <firebaseAuth.Provider value={value}>{children}</firebaseAuth.Provider>
  );
}
