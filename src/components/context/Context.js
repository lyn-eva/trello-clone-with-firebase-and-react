import { createContext, useContext } from "react";

const trelloContext = createContext();

export const useTrello = () => {
  return useContext(trelloContext);
};

function Context({children}) {

  const value = {
    useTrello,
    // BG_THEME: "rgb(157,226,178)",
    BG_THEME: "#0079bf",
  };

  return (
    <trelloContext.Provider value={value}>{children}</trelloContext.Provider>
  );
}

export default Context;
