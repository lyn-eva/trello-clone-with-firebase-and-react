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
  const [currentUser, setcurrentUser] = useState(null);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      setcurrentUser(user);
      console.log('auth state changed')
    });

    return unsubAuth;
  }, []);

  console.log(currentUser?.reloadUserInfo)


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

  const value = {
    currentUser,
    normalSignUp,
    normalSignIn,
    signOutUser,
    updateDisplayName,
  };

  return (
    <firebaseAuth.Provider value={value}>{children}</firebaseAuth.Provider>
  );
}
