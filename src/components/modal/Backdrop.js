import React from "react";

function Backdrop({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="fixed w-full h-full bg-black opacity-[.2] z-10"
    ></div>
  );
}

export default Backdrop;
