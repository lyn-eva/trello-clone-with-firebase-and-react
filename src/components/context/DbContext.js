import { createContext, useContext } from "react";
import { doc, collection, setDoc } from "@firebase/firestore";
import { db } from "../firebase-config";

const dbContext = createContext();

export const useDB = () => {
  return useContext(dbContext);
};

export default function DbContext({ children }) {
  const users = collection(db, "users");
  // console.log(users);

  const createProfile = (user) => {
    return setDoc(doc(users, user), { user });
  };

  const value = { createProfile };

  return <dbContext.Provider value={value}>{children}</dbContext.Provider>;
}
