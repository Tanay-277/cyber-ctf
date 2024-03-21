"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";
import { LinearGradient } from "react-text-gradients";

const LoadingOverlay = () => {
  const phrases = [
    "Connecting to Hub...",
    "Retrieving Answers...",
    "Checking Answers...",
    "Performing Contrasts...",
    "Let's go!...",
  ];
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [text, setText] = useState("");
  const [isTypingCompleted, setIsTypingCompleted] = useState(false);
  const [isDisplayNone, setIsDisplayNone] = useState(false);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentPhrase = phrases[currentPhraseIndex];
      setText((prevText) => {
        const nextText =
          prevText === currentPhrase
            ? currentPhrase.substring(0, prevText.length - 1)
            : currentPhrase.substring(0, prevText.length + 1);
        return nextText;
      });

      if (text === currentPhrase) {
        setIsTypingCompleted(true);
      }
    }, 50);

    setTimeout(() => {
      setIsLoading(false);
      clearInterval(typingInterval);
    }, 10000);

    return () => clearInterval(typingInterval);
  }, [text, currentPhraseIndex, phrases]);

  useEffect(() => {
    if (isTypingCompleted) {
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) =>
          prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
        );
        setIsTypingCompleted(false);
        setText("");
      }, 1000);
    }
  }, [isTypingCompleted]);

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setIsDisplayNone(true);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <motion.div
      className={`absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center z-50 text-slate-500 text-2xl ${
        isDisplayNone ? "hidden" : ""
      }`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {phrases.map((phrase, index) => (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: currentPhraseIndex === index ? 1 : 0,
              y: currentPhraseIndex === index ? 0 : -20,
            }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "10px" }}
          >
            {phrase}
          </motion.h2>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  return (
    <>
      <LoadingOverlay />
      <Spline scene="https://prod.spline.design/r2fxZA21HvoZdHtw/scene.splinecode" />
      <div className="absolute top-[10%] left-0 h-10 w-full flex items-center justify-center flex-col mt-20">
        <h1 className="text-7xl mb-10">
          <LinearGradient gradient={["to left", "#0b2125 ,#2226eb"]}>
            Congratulations
          </LinearGradient>
        </h1>
        <h3 className="text-2xl">You completed the journey.</h3>
      </div>
    </>
  );
}
