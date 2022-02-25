import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase-config";

console.log('rerendered')
const trelloContext = createContext();

export const useTrello = () => {
  return useContext(trelloContext);
};

function Context({ children }) {
  const [bg, setBg] = useState("#0079bf");

  const value = {
    useTrello,
    BG_THEME: bg,
    setBg,
  };

  return (
    <trelloContext.Provider value={value}>{children}</trelloContext.Provider>
  );
}

export default Context;
