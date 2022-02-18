import React from "react";

function Button({ children, clickFunc, className }) {
  return (
    <button
      onClick={clickFunc}
      className={`${className} text-sm px-4 rounded-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
