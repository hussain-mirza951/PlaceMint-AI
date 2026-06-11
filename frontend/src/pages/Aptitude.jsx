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
    {
      question: "A train travels 60 km in 1 hour. Speed?",
      options: ["60 km/h", "50 km/h", "40 km/h"],
      answer: "60 km/h",
    },
    {
      question: "If x = 5, x² = ?",
      options: ["10", "20", "25"],
      answer: "25",
    },
    {
      question: "Average of 10 and 20?",
      options: ["15", "20", "10"],
      answer: "15",
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
      const percentage = Math.round(
        (newScore / questions.length) * 100
      );

      localStorage.setItem(
        "aptitudeScore",
        percentage
      );

      setFinished(true);
    }
  };

  if (finished) {
    const percentage = Math.round(
      (score / questions.length) * 100
    );

    let performance = "Needs Improvement";

    if (percentage >= 80) {
      performance = "Excellent";
    } else if (percentage >= 60) {
      performance = "Good";
    }

    return (
      <div className="dashboard">
        <h1>Aptitude Test Completed</h1>

        <div className="roadmap-result">
          <h2>
            Final Score: {score}/{questions.length}
          </h2>

          <h2>{percentage}%</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${percentage}%`,
              }}
            ></div>
          </div>

          <br />

          <h3>Performance</h3>
          <p>{performance}</p>

          <h3>Recommendation</h3>

          {percentage >= 80 && (
            <p>
              ✅ Strong aptitude skills. Focus on
              interviews and DSA.
            </p>
          )}

          {percentage >= 60 &&
            percentage < 80 && (
              <p>
                ⚠️ Good foundation. Practice more
                quantitative aptitude.
              </p>
            )}

          {percentage < 60 && (
            <p>
              ❌ Aptitude needs improvement. Daily
              practice recommended.
            </p>
          )}
        </div>
      </div>
    );
  }

  const progress = Math.round(
    ((current + 1) / questions.length) * 100
  );

  return (
    <div className="dashboard">
      <h1>Aptitude Practice</h1>

      <div className="roadmap-result">
        <h3>
          Question {current + 1} of{" "}
          {questions.length}
        </h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>
        </div>

        <br />

        <h2>{questions[current].question}</h2>

        <div className="features">
          {questions[current].options.map(
            (option) => (
              <button
                key={option}
                className="primary-btn"
                onClick={() =>
                  handleAnswer(option)
                }
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Aptitude;