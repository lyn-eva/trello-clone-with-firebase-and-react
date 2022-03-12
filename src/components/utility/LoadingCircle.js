import React from "react";

function LoadingCircle({ msg }) {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div
        className="animate-spin w-10 h-10 border-4 border-t-[#c46f3e] rounded-full mx-auto mb-3"
      ></div>
      <p>{msg}</p>
    </div>
  );
}

export default LoadingCircle;
