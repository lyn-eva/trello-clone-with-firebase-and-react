import { createContext, useContext, useState, useEffect } from "react";
import { doc, collection, setDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";
import { getAuth } from "@firebase/auth";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  
  const usersCol = collection(db, "users");
  
  const createProfile = (user) => {
    return setDoc(doc(usersCol, user), { user });
  };
  
  const createBoard = (name) => {
    const { currentUser } = getAuth();
    const userColRef = collection(db, `users/${currentUser.displayName}/${name}`);
    return setDoc(doc(userColRef, 'temp'), {txt: 'it works'});
  };

  const getDocuments = async () => {
    const res = await getDocs(usersCol);
    return res.docs.map((doc) => doc.id);
  };

  const value = { createProfile, createBoard, getDocuments };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
