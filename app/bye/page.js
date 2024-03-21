"use client";
import Spline from "@splinetool/react-spline";

export default function App() {
  return (
    <>
      <Spline scene="https://prod.spline.design/r2fxZA21HvoZdHtw/scene.splinecode" />
      <div className="absolute top-0 left-1/3 h-10 w-full ">
          Congratulations! <br/> You have successfully completed the test.<br/>You are a Crusader!
      </div>
    </>
  );
}