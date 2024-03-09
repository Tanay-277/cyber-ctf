"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopLoadingBar from "react-top-loading-bar";
import { Client, Databases } from "appwrite";
import { questions } from "@/constants/quest";
import "./arena.css";
import "../globals.css";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProgress(20); // Start progress bar
        const client = new Client();
        client
          .setEndpoint("https://cloud.appwrite.io/v1")
          .setProject("65ec1230719bac248df0");

        const databases = new Databases(client);
        const response = await databases.listDocuments(
          "65ec12ef3449f5d0d0a8",
          "65ec13ef5f7b1763704e"
        );
        setData(response.documents);
        setLoading(false);
        setProgress(100);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
        setProgress(100);
      }
    };

    fetchData();
  }, []);

  const handlePasswordSubmit = () => {
    const question = questions[currentQuestionIndex];
    const razor = data[question.questionNumber - 1]?.alphanumeric;
    console.log("Password submitted:", password);
    if (razor === password) {
      console.log("Correct password!");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPassword("");
        setShowNextQuestion(false);
      }
    } else {
      console.log("Incorrect password!");
      setPassword("");
      setIsModalOpen(true);
      // Trigger the shaking animation
      const inputElement = document.getElementById("passwordInput");
      if (inputElement) {
        inputElement.animate(
          [
            { border: "1px solid red" },
            { transform: "translateX(0)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(-10px)" },
            { transform: "translateX(10px)" },
            { transform: "translateX(0)" },
          ],
          {
            duration: 500,
            iterations: 1,
          }
        );
      }
    }
  };

  const handleNextQuestion = () => {
    setShowNextQuestion(true);
    setIncorrectPassword(false);
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="arena">
      <TopLoadingBar
        className="top-loading-bar"
        color="#A020F0"
        height="2px"
        shadow="true"
        progress={progress}
      />
      <AnimatePresence>
        {!showNextQuestion && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`question ${incorrectPassword ? "shake" : ""}`}
          >
            <h1 className="text-4xl font-bold text-center mb-4">
              {questions[currentQuestionIndex].questionNumber}.
              {questions[currentQuestionIndex].question}
            </h1>
            <p className="text-center text-gray-500">
              {questions[currentQuestionIndex].hint}
            </p>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
              <input
                id="passwordInput"
                type="text"
                className="text-black px-4 py-2 border-[0.1px] border-[#ffffff12] rounded-lg"
                value={password}
                onChange={handleChange}
              />
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 rounded-lg border-[0.1px] border-[#ffffff12]"
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
        {showNextQuestion && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="question"
          >
            <button
              onClick={handleNextQuestion}
              className="px-4 py-2 rounded-lg border-[0.1px] border-[#ffffff12]"
            >
              Next Question
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Page;

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal absolute top-[10%] right-[10%] bg-black p-4 flex item-center justify-between rounded-lg">
      <div className="modal-content flex flex-row-reverse items-center justify-center">
        <span className=" cursor-pointer grid place-items-center ml-4 close text-3xl p-1 px-3 hover:bg-red-600 transition-colors ease-linear rounded-xl" onClick={onClose}>
          &times;
        </span>
        <p>Wrong answer! Please try again.</p>
      </div>
    </div>
  );
};
