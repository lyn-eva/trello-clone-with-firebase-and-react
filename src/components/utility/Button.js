import React from "react";

function Button({ children, clickFunc, className, style }) {
  return (
    <button
      onClick={clickFunc}
      className={`${className} px-4`}
      style={style || 
      {}}
    >
      {children}
    </button>
  );
}

export default Button;
