import "../App.css";
import { useState } from "react";

function Resume() {
  const [fileName, setFileName] = useState("");
  const [showResult, setShowResult] = useState(false);

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
  };

  const [score, setScore] = useState(0);

const analyzeResume = () => {
  const randomScore =
    Math.floor(Math.random() * 31) + 70;

  setScore(randomScore);

  setShowResult(true);
};
  return (
    <div className="dashboard">
      <h1>Resume Analyzer</h1>

      <input
        type="file"
        onChange={handleFileChange}
      />

      <br />
      <br />

      {fileName && (
        <p>Selected File: {fileName}</p>
      )}

      <button
        className="primary-btn"
        onClick={analyzeResume}
      >
        Analyze Resume
      </button>

      {showResult && (
        <div className="result-card">
          <h2>Resume Score: {score}/100</h2>

          <h3>Strengths</h3>
          <ul>
            <li>Good academic background</li>
            <li>Technical skills listed</li>
            <li>Projects included</li>
          </ul>

          <h3>Improvements</h3>
          <ul>
            <li>Add measurable achievements</li>
            <li>Improve project descriptions</li>
            <li>Add GitHub profile link</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Resume;