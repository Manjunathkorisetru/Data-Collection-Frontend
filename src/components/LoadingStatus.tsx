// import React from 'react'

function LoadingStatus() {
  return (
    <div
      className=" bg-slate-200 shadow-md rounded-md p-4 animate-pulse w-1/2 flex 
    justify-center items-center mt-[20vh] mx-auto"
    >
      <div className="rounded-md mb-4 px-4 py-2 mt-14 text-4xl">Loading...</div>
    </div>
  );
}

export default LoadingStatus;
