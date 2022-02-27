import { createContext, useContext } from "react";
import { doc, collection, setDoc, getDocs } from "@firebase/firestore";
import { db } from "../firebase-config";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  const users = collection(db, "users");
  getDocs(users).then((res) => console.log(res))

  const createProfile = (user) => {
    return setDoc(doc(users, user), { user });
  };

  const value = { createProfile };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
