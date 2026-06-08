import "../App.css";
import { useState } from "react";

function Aptitude() {
  const questions = [
    {
      question: "5 + 3 = ?",
      options: ["7", "8", "9"],
      answer: "8",
    },
    {
      question: "12 / 4 = ?",
      options: ["2", "3", "4"],
      answer: "3",
    },
    {
      question: "15 - 6 = ?",
      options: ["9", "8", "7"],
      answer: "9",
    },
    {
      question: "10 × 2 = ?",
      options: ["20", "12", "18"],
      answer: "20",
    },
    {
      question: "25 + 25 = ?",
      options: ["40", "45", "50"],
      answer: "50",
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleAnswer = (option) => {
    let newScore = score;

    if (option === questions[current].answer) {
      newScore++;
      setScore(newScore);
    }

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      localStorage.setItem("aptitudeScore", newScore);
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="dashboard">
        <h1>Aptitude Test Completed</h1>

        <div className="roadmap-result">
          <h2>
            Final Score: {score}/{questions.length}
          </h2>

          <p>
            Percentage:{" "}
            {Math.round((score / questions.length) * 100)}%
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>Aptitude Practice</h1>

      <div className="roadmap-result">
        <h3>
          Question {current + 1} of {questions.length}
        </h3>

        <p>{questions[current].question}</p>

        {questions[current].options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Aptitude;