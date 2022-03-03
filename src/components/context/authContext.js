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
  const [currentUser, setCurrentUser] = useState(null);
  // const [currentUsername, setCurrentUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user?.displayName);
      console.log('auth state changed')
      // setCurrentUsername(
      //   user && user.currentUser && user.currentUser.displayName
      // );
    });

    return unsubscribe;
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
    currentUser,
    normalSignUp,
    normalSignIn,
    signOutUser,
    updateUserProfile,
  };

  return (
    <firebaseAuth.Provider value={value}>{children}</firebaseAuth.Provider>
  );
}
