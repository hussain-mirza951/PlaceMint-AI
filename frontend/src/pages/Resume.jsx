import "../App.css";
import { useState } from "react";

function Resume() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Software Engineer");
  const [targetSkills, setTargetSkills] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);
    setAnalysis(null);
    setError("");
  };

  const analyzeResume = async () => {
    if (!selectedFile) {
      setError("Please upload a PDF resume first.");
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);
    formData.append("targetRole", targetRole);
    formData.append("targetSkills", targetSkills);

    setIsAnalyzing(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Resume analysis failed.");
      }

      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="dashboard">
      <h1>Resume Analyzer</h1>

      <div className="resume-analyzer">
        <div className="resume-upload-panel">
          <label htmlFor="resume-file">Upload PDF Resume</label>
          <input
            id="resume-file"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />

          {selectedFile && (
            <p>Selected File: {selectedFile.name}</p>
          )}

          <label htmlFor="target-role">Target Role</label>
          <select
            id="target-role"
            value={targetRole}
            onChange={(event) => setTargetRole(event.target.value)}
          >
            <option>Software Engineer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Data Analyst</option>
          </select>

          <label htmlFor="target-skills">Custom Target Skills</label>
          <input
            id="target-skills"
            type="text"
            value={targetSkills}
            onChange={(event) => setTargetSkills(event.target.value)}
            placeholder="Optional: Python, SQL, React"
          />

          <button
            className="primary-btn"
            onClick={analyzeResume}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
          </button>

          {error && <p className="error-text">{error}</p>}
        </div>

        {analysis && (
          <div className="result-card">
            <h2>ATS Score: {analysis.score}/100</h2>
            <p>Target Role: {analysis.targetRole}</p>

            <h3>Skills Found</h3>
            <div className="skill-list">
              {analysis.skillsFound.length > 0 ? (
                analysis.skillsFound.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))
              ) : (
                <p>No known skills detected.</p>
              )}
            </div>

            <h3>Missing Skills</h3>
            <ul>
              {analysis.missingSkills.length > 0 ? (
                analysis.missingSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))
              ) : (
                <li>No target skill gaps detected.</li>
              )}
            </ul>

            <h3>ATS Checks</h3>
            <ul>
              <li>Email present: {analysis.checks.hasEmail ? "Yes" : "No"}</li>
              <li>Phone present: {analysis.checks.hasPhone ? "Yes" : "No"}</li>
              <li>Word count: {analysis.checks.wordCount}</li>
              <li>Quantified achievements: {analysis.checks.quantifiedImpactCount}</li>
              <li>
                Target skill matches: {analysis.checks.targetSkillMatches}/
                {analysis.checks.targetSkillTotal}
              </li>
            </ul>

            <h3>Suggestions</h3>
            <ul>
              {analysis.suggestions.map((suggestion) => (
                <li key={suggestion}>{suggestion}</li>
              ))}
            </ul>

            <h3>Extracted Text Preview</h3>
            <p className="resume-preview">{analysis.extractedTextPreview}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Resume;
