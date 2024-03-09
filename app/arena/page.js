"use client";
import React, { useState } from "react";
import "./arena.css";
import "../globals.css";
import Question from "@/components/Question";
import { questions } from "@/constants/quest";
import { Client, Databases, ID } from "appwrite";

const Page = () => {
  const [data, setData] = useState([]);

  const client = new Client();

  client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("65ec1230719bac248df0");

  const databases = new Databases(client);

  const promise = databases.listDocuments(
    "65ec12ef3449f5d0d0a8",
    "65ec13ef5f7b1763704e"
  );

  promise.then(
    function (response) {
      setData(response.documents);
    },
    function (error) {
      console.log(error);
    }
  );

  const handlePasswordSubmit = (questionNumber, password) => {
    const razor = data[questionNumber - 1]?.alphanumeric;
    console.log(razor, password);
    if (razor == password) {
      alert("Correct password!");
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="arena">
      {questions.map((question, index) => (
        <Question
          key={index}
          questionNumber={question.questionNumber}
          question={question.question}
          hint={question.hint}
          onSubmit={(password) =>
            handlePasswordSubmit(question.questionNumber, password)
          }
        />
      ))}
    </div>
  );
};

export default Page;
