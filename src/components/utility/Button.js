import React from "react";

function Button({ children, clickFunc, className }) {
  return (
    <button
      onClick={clickFunc}
      className={`${className} px-4`}
    >
      {children}
    </button>
  );
}

export default Button;
