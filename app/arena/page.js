"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopLoadingBar from "react-top-loading-bar";
import { Client, Databases } from "appwrite";
import { questions } from "@/constants/quest";
import "./arena.css";
import "../globals.css";

const Page = () => {
  // const hiddenTimeRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === "hidden") {
    //     console.log("Tab is hidden, starting timer...");
    //     hiddenTimeRef.current = setTimeout(checkHiddenDuration, 2000); // Check after 2 seconds
    //   } else {
    //     // Clear the timer when the tab becomes visible again
    //     clearTimeout(hiddenTimeRef.current);
    //   }
    // };

    // const checkHiddenDuration = () => {
    //   console.log(
    //     "Tab has been hidden for an extended period, taking action..."
    //   );
    //   // Perform action when the tab remains hidden for an extended period
    //   // For example, display a message or close the tab
    //   document.body.style.background = "#000";
    //   document.body.style.display = "grid";
    //   document.body.style.placeItems = "center";
    //   document.body.style.fontSize = "4rem";
    //   document.body.innerHTML =
    //     "Since you have left the tab, the content has been hidden for security reasons. Please close the tab and try again.";
    //   // Close the current tab
    //   window.close();
    // };

    // Add event listener for visibility change
    // document.addEventListener("visibilitychange", handleVisibilityChange);

    // Disable right-click
    const disableRightClick = (event) => {
      event.preventDefault();
    };
    // Disable F11 key
    const disableF11Key = (event) => {
      if (event.keyCode === 122) {
        event.preventDefault();
        console.log("Pressed F11");
      }
    };
    document.addEventListener("keydown", disableF11Key);

    // disable content menu
    document.addEventListener("contextmenu", disableRightClick);

    // Disable F12 key
    const disableF12Key = (event) => {
      if (event.keyCode === 123) {
        event.preventDefault();
        console.log("Pressed F12");
      }
    };
    document.addEventListener("keydown", disableF12Key);

    // Disable context menu
    const disableCtrlShiftI = (event) => {
      if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", disableCtrlShiftI);

    // Prevent drag and drop
    const preventDragDrop = (event) => {
      event.preventDefault();
    };
    document.addEventListener("dragstart", preventDragDrop);

    // Prevent selection
    const preventSelection = (event) => {
      event.preventDefault();
    };
    document.addEventListener("selectstart", preventSelection);

    // Cleanup function
    return () => {
      // Clean up event listeners
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableF12Key);
      document.removeEventListener("keydown", disableCtrlShiftI);
      // document.removeEventListener("fullscreenchange", preventFullScreen);
      document.removeEventListener("keydown", disableF11Key);
      document.removeEventListener("dragstart", preventDragDrop);
      document.removeEventListener("selectstart", preventSelection);
      // clearTimeout(hiddenTimeRef.current); // Clear the timeout
    };
  }, []);

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
        setIncorrectPassword(false);
      }
    } else {
      console.log("Incorrect password!");
      setPassword("");
      setIsModalOpen(true);
      setIncorrectPassword(true);
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
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className={`question ${incorrectPassword ? "shake" : ""}`}
          >
            <div className="questionHead border-b-[0.1px] border-[#ffffff12] w-full">
              <h1 className="text-4xl font-bold text-center mb-4 tracking-widest">
                {/* {questions[currentQuestionIndex].questionNumber}. */}
                {questions[currentQuestionIndex].head}
              </h1>
            </div>
            <div className="questionMid gap-4 flex flex-col">
              <h3 className="text-3xl font-semibold text-center mb-4">
                {questions[currentQuestionIndex].question}
              </h3>
              <p className="bg-[#000000ba] text-gray-500 rounded-full p-4 mb-4">
                {questions[currentQuestionIndex].questionText}
              </p>
              <p className="text-center text-gray-500">
                Hint: {questions[currentQuestionIndex].hint}
              </p>
            </div>
            <div className="relative questionBot pt-4 px-4 border-t-[0.1px] border-[#ffffff12] w-full flex flex-col items-center justify-center gap-4 mt-4">
              <input
                id="passwordInput"
                type="text"
                className="text-[#faebd7] px-4 py-4 border-[0.1px] border-[#faebd7] rounded-full w-full bg-[#060f16] "
                value={password}
                onChange={handleChange}
                placeholder={questions[currentQuestionIndex].answerInstructions}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePasswordSubmit();
                  }
                }}
              />
              <button
                onClick={handlePasswordSubmit}
                className="absolute right-6 bg-[#060f16] z-10 px-4 py-2 rounded-full border-[0.1px] transition-colors ease-in-out border-[#faebd7] hover:text-[#060f16] hover:bg-[#faebd7]"
              >
                Submit
              </button>
            </div>
            {/* <p>{questions[currentQuestionIndex].answerInstructions}</p> */}
          </motion.div>
        )}
        {/* {showNextQuestion && (
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
        )} */}
      </AnimatePresence>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Page;

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);
  const modalVariants = {
    hidden: {
      opacity: 0,
      y: "-100%",
    },
    visible: {
      opacity: 1,
      y: "0%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      className="modal absolute top-[15%] right-[10%] bg-black p-4 px-5 flex item-center justify-between rounded-full border-[0.1px] border-[#faebd7]"
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={modalVariants}
    >
      <div className="modal-content flex flex-row-reverse items-center justify-center">
        <span
          className="cursor-pointer grid place-items-center ml-4 close text-3xl p-1 transition-colors ease-linear text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          &times;
        </span>
        <p>Wrong answer! Please try again.</p>
      </div>
    </motion.div>
  );
};
