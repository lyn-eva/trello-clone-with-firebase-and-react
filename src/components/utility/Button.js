import React from "react";

function Button({ children, clickFunc, className }) {
  return (
    <button
      onClick={clickFunc}
      className={`${className} text-sm px-2 py-[5px] rounded-sm`}
    >
      {children}
    </button>
  );
}

export default Button;
