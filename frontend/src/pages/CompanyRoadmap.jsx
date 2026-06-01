import "../App.css";
import { useState } from "react";

function CompanyRoadmap() {
  const [company, setCompany] = useState("");

  return (
    <div className="dashboard">
      <h1>Company Roadmap</h1>

      <div className="features">
        <div
          className="card"
          onClick={() => setCompany("Amazon")}
        >
          <h3>Amazon</h3>
          <p>DSA • LLD • Projects</p>
        </div>

        <div
          className="card"
          onClick={() => setCompany("Google")}
        >
          <h3>Google</h3>
          <p>DSA • System Design • CP</p>
        </div>

        <div
          className="card"
          onClick={() => setCompany("Microsoft")}
        >
          <h3>Microsoft</h3>
          <p>DSA • OOP • Projects</p>
        </div>
      </div>

      {company === "Amazon" && (
        <div className="roadmap-result">
          <h2>Amazon Roadmap</h2>

          <p>1. Master DSA</p>
          <p>2. Learn LLD</p>
          <p>3. Build Backend Projects</p>
          <p>4. Practice OA Questions</p>
        </div>
      )}

      {company === "Google" && (
        <div className="roadmap-result">
          <h2>Google Roadmap</h2>

          <p>1. Advanced DSA</p>
          <p>2. Competitive Programming</p>
          <p>3. System Design</p>
          <p>4. Mock Interviews</p>
        </div>
      )}

      {company === "Microsoft" && (
        <div className="roadmap-result">
          <h2>Microsoft Roadmap</h2>

          <p>1. DSA</p>
          <p>2. OOP Concepts</p>
          <p>3. Full Stack Projects</p>
          <p>4. Behavioral Interviews</p>
        </div>
      )}
    </div>
  );
}

export default CompanyRoadmap;