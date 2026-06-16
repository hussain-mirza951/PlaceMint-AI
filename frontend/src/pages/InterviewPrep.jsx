import "../App.css";
import { useState } from "react";

function InterviewPrep() {
  const [company, setCompany] =
    useState("Google");

  const [current, setCurrent] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [showAnswer, setShowAnswer] =
    useState(false);

  const questions = {
    Google: [
      {
        question:
          "What is the time complexity of Binary Search?",
        answer: "O(log n)",
      },
      {
        question:
          "Difference between Stack and Queue?",
        answer:
          "Stack is LIFO, Queue is FIFO.",
      },
    ],

    Amazon: [
      {
        question:
          "Explain HashMap.",
        answer:
          "Key-value data structure with average O(1) lookup.",
      },
      {
        question:
          "What is a REST API?",
        answer:
          "Architectural style for web services.",
      },
    ],

    Microsoft: [
      {
        question:
          "What is Polymorphism?",
        answer:
          "Ability of one interface to have multiple implementations.",
      },
      {
        question:
          "Explain Inheritance.",
        answer:
          "Mechanism where one class acquires properties of another.",
      },
    ],
  };

  const currentQuestion =
    questions[company][current];

  const nextQuestion = () => {
    if (
      current <
      questions[company].length - 1
    ) {
      setCurrent(current + 1);
      setShowAnswer(false);
    } else {
      const finalScore =
        score + 10;

      localStorage.setItem(
        "interviewScore",
        finalScore
      );

      alert(
        "Interview Round Completed!"
      );
    }
  };

  return (
    <div className="dashboard">
      <h1>🎤 Interview Preparation</h1>

      <div className="panel">
        <h2>Select Company</h2>

        <select
          value={company}
          onChange={(e) => {
            setCompany(
              e.target.value
            );
            setCurrent(0);
            setShowAnswer(false);
          }}
        >
          <option>Google</option>
          <option>Amazon</option>
          <option>Microsoft</option>
        </select>
      </div>

      <div className="roadmap-result">
        <h2>
          Question {current + 1}
        </h2>

        <p>
          {
            currentQuestion.question
          }
        </p>

        {showAnswer && (
          <div>
            <h3>Answer</h3>

            <p>
              {
                currentQuestion.answer
              }
            </p>
          </div>
        )}

        <button
          className="primary-btn"
          onClick={() =>
            setShowAnswer(true)
          }
        >
          Show Answer
        </button>

        <button
          className="primary-btn"
          onClick={nextQuestion}
        >
          Next Question
        </button>
      </div>
    </div>
  );
}

export default InterviewPrep;