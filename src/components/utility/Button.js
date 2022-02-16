import React from "react";

function Button({ children, clickFunc, className }) {
  return (
    <button
      onClick={clickFunc}
      className={`text-white text-sm px-2 py-[5px] rounded-sm ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
