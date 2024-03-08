"use client";
import "./page.css";
import React, { useState } from "react";
import { LampContainer } from "@/components/ui/lamp";
import Instruction from "@/components/Instruction";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleClick = () => {
    setShowInstructions(true);
  };

  const handleGoBack = () => {
    setShowInstructions(false);
  };

  return (
    <div className="hero">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-6 head mt-10 -mb-16 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <span className="font-semibold tracking-wider -mb-10">Cyber CTF</span>{" "}
          <br /> A saga of Cyber Security
          <button
            onClick={handleClick}
            className={`btn inline-flex animate-shimmer bg-[length:200%_100%] items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]  text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 `}
          >
            Start Now
          </button>
        </motion.h1>
      </LampContainer>
      <AnimatePresence>
        {showInstructions && (
          <motion.div
            className="instruction-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Instruction />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
