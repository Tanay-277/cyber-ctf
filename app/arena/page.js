"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TopLoadingBar from "react-top-loading-bar";
import { Client, Databases } from "appwrite";
import { questions } from "@/constants/quest";
import { useRouter } from "next/navigation";
import "./arena.css";
import "../globals.css";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  // const hiddenTimeRef = useRef(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [password, setPassword] = useState("");
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
    // const razor = "abc";
    // console.log("Password submitted:", password);
    if (razor === password) {
      // console.log("Correct password!");
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setPassword("");
        setShowNextQuestion(false);
        setIncorrectPassword(false);
      } else {
        // Redirect user to /bye if it's the last question
        router.push("/bye");
      }
    } else {
      // console.log("Incorrect password!");
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

  const handleCopyClick = () => {
    navigator.clipboard.writeText(questions[currentQuestionIndex].questionText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 4000);
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
                {questions[currentQuestionIndex].head}
              </h1>
            </div>
            <div className="questionMid gap-4 flex flex-col px-28">
              <h3 className="text-3xl font-semibold text-center mb-4 leading-[2.8rem]">
                {questions[currentQuestionIndex].question}
              </h3>
              <p className="relative bg-[#000000ba] text-gray-500 rounded-full p-4 mb-4">
                {questions[currentQuestionIndex].questionText}
                <motion.button
                  className="absolute right-[10px] top-2 text-black bg-[#b4c3ce] z-10 px-4 py-2 rounded-full border-[0.1px] transition-colors ease-linear duration-300 border-none hover:text-[#060f16] hover:bg-[#faebd7]"
                  onClick={handleCopyClick}
                  // initial={{ y: -50, opacity: 0 }}
                  // animate={{ y: 0, opacity: 1 }}
                  // transition={{ duration: 0.5, delay: 0.5 }}
                >
                  {isCopied ? (
                    <motion.svg
                      initial={{ y: -50, opacity: 0 }}
                      exit={{ y: -50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              </p>
              <p className="text-center text-gray-500">
                Hint: {questions[currentQuestionIndex].hint}
              </p>
            </div>
            <div className="relative questionBot pt-4 px-4 border-t-[0.1px] border-[#ffffff12] w-full flex flex-col items-center justify-center gap-4 mt-4">
              <input
                autoComplete="off"
                id="passwordInput"
                type="text"
                className="text-[#faebd7] px-4 py-4 border-[0.1px] border-[#faebd7] rounded-full w-full bg-[#060f16] focus:outline-none transition-colors"
                value={password}
                onChange={handleChange}
                placeholder={
                  questions[currentQuestionIndex].answerInstructions ||
                  "Enter the flag"
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handlePasswordSubmit();
                  }
                }}
              />
              <button
                onClick={handlePasswordSubmit}
                className="absolute right-6 bg-[#060f16] z-10 px-4 py-2 rounded-full border-[0.1px] transition-colors ease-in-out duration-300 border-[#faebd7] hover:text-[#060f16] hover:bg-[#faebd7]"
              >
                {/* if the question is last then it should render a linnk tag */}
                {currentQuestionIndex === questions.length - 1 ? (
                  <Link href="/bye">
                    Next
                  </Link>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </motion.div>
        )}
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
