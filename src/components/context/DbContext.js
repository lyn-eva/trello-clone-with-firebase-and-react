import { createContext, useContext, useState, useEffect } from "react";
import { doc, collection, setDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {

  const usersCol = collection(db, "users");

  const createProfile = (user) => {
    return setDoc(doc(usersCol, user), { user });
  };

  const getDocuments = async () => {
    const res = await getDocs(usersCol);
    return res.docs.map((doc) => doc.id);
  };

  const value = { createProfile, getDocuments };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
