// components/Question.js

import React, { useState } from "react";

const Question = ({ questionNumber, question, hint, onSubmit }) => {
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit(password);
    };

    return (
        <div className="question">
            <h1 className="text-4xl font-bold text-center mb-4">
                {questionNumber}.{question}
            </h1>
            <p className="text-center text-gray-500">{hint}</p>
            <div className="flex flex-col items-center justify-center gap-4 mt-4">
                <input
                    type="text"
                    className="text-black px-4 py-2 border-[0.1px] border-[#ffffff12] rounded-lg"
                    value={password}
                    onChange={handleChange}
                />
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-lg border-[0.1px] border-[#ffffff12]"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Question;
