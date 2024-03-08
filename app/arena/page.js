import React from "react";
import "./arena.css";

const page = () => {
  return (
    <div className="arena flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center mb-4">
        What is the capital of France?
      </h1>
      <p className="text-center text-gray-500">Hint: The city of love</p>
      <div className="flex flex-col items-center justify-center gap-4 mt-4">
        <input
          type="text"
          className="px-4 py-2 border-[0.1px] border-[#ffffff12] rounded-lg"
        />
        <button className="px-4 py-2 rounded-lg border-[0.1px] border-[#ffffff12]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default page;
