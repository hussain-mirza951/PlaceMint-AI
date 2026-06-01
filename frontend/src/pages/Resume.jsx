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

  <h3>Skills Found</h3>
  <ul>
    <li>Java</li>
    <li>Python</li>
    <li>Data Structures</li>
    <li>SQL</li>
  </ul>

  <h3>Missing Skills</h3>
  <ul>
    <li>System Design</li>
    <li>Cloud Computing</li>
    <li>Docker</li>
  </ul>

  <h3>Suggestions</h3>
  <ul>
    <li>Add GitHub project links</li>
    <li>Quantify project achievements</li>
    <li>Highlight internships and certifications</li>
  </ul>
</div>
      )}
    </div>
  );
}

export default Resume;