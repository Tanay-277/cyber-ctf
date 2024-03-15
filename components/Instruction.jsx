import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Instruction = ({ show, onClose }) => {
    const instructions = [
        'Check you have linux OS in Virtual Machine with docker installed in it.',
        'You are allowed to use Google.',
        'Don\'t use any chatbot link Chatgpt, Gemini,etc',
        'After solving each task you get a flag which is key to next level.',
        'For any queries ask your volunteer and level volunteers.',
        'Remember to follow all event guidelines and instructions provided by organizers.',
        // 'Keep Calm'
    ];

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };
    return (
        <div className={` flex-col justify-between 
        ${show ? 'flex' : 'hidden'}
        `}>
            <div className="top flex items-center justify-between border-b-[0.1px] border-[#ffffff12] p-4 text-xl">
                <h2>Cyber Crucible Instrutions</h2>
                <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <div className="w-4 h-4 bg-emerald-700 rounded-full"></div>
                    <div className="w-4 h-4 bg-purple-900 rounded-full"></div>
                </div>
            </div>
            <div className="mid flex flex-col p-4 gap-6">
                {instructions.map((instruction, index) => (
                    <p key={index}>
                        {index + 1}. {instruction}
                    </p>
                ))}
                <div className="complete mt-4 flex flex-row items-center justify-center gap-4 bg-[#000000a3] border-[0.1px] border-[#ffffff12] py-2 rounded-xl">
                    <input
                        type="checkbox"
                        id="complete"
                        name="complete"
                        value="complete"
                        className='w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500'
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="complete">I have read and understood the instructions</label>
                </div>
                {/* Go Back and Go Ahead buttons */}
                <div className="bot pb-4 flex items-center justify-center gap-4 mb-2">
                    <button
                        onClick={onClose}
                        className="flex items-center justify-center px-4 py-2 rounded-lg border-[0.1px] border-[#ff16166b] go-back-button gap-4"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="-rotate-90"
                            width={32}
                            height={32}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#fff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 17v-14" />
                            <path d="M15 6l-3 -3l-3 3" />
                            <path d="M12 17a2 2 0 1 0 0 4a2 2 0 0 0 0 -4" />
                        </svg>
                        Go Back
                    </button>
                    <Link href="/arena">
                        <motion.button
                            className={`flex items-center justify-center px-4 py-2 rounded-lg border-[0.1px] border-[#ffffff12] go-back-button transition-all ease-in-out gap-4 ${isChecked ? '' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={!isChecked}
                            whileTap={{ scale: 0.9 }}

                            // whileHover={{ scale: 0.9, rotate: [0, -10, 10, -10, 10, 0] }}
                            {...(!isChecked ? { whileHover: { scale: 0.9, rotate: [0, -10, 10, -10, 10, 0] } } : {})}
                        >
                            Go Ahead
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="rotate-90"
                                width={32}
                                height={32}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#fff"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 17v-14" />
                                <path d="M15 6l-3 -3l-3 3" />
                                <path d="M12 17a2 2 0 1 0 0 4a2 2 0 0 0 0 -4" />
                            </svg>
                        </motion.button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Instruction;