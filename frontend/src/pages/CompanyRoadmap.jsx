import "../App.css";
import { useState } from "react";

function CompanyRoadmap() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const [company, setCompany] = useState(
    profile.company || ""
  );

  const roadmaps = {
    Amazon: {
      readiness: 80,
      steps: [
        "Master Data Structures & Algorithms",
        "Learn Low Level Design",
        "Build Backend Projects",
        "Practice Online Assessments",
        "Prepare Leadership Principles",
      ],
    },

    Google: {
      readiness: 75,
      steps: [
        "Advanced DSA",
        "Competitive Programming",
        "System Design",
        "Open Source Contributions",
        "Mock Interviews",
      ],
    },

    Microsoft: {
      readiness: 78,
      steps: [
        "Data Structures",
        "OOP Concepts",
        "Operating Systems",
        "Full Stack Projects",
        "Behavioral Interviews",
      ],
    },

    Infosys: {
      readiness: 90,
      steps: [
        "Aptitude Preparation",
        "Communication Skills",
        "OOP Basics",
        "DBMS Concepts",
        "Mock HR Interviews",
      ],
    },

    TCS: {
      readiness: 92,
      steps: [
        "Aptitude Practice",
        "Coding Basics",
        "DBMS",
        "Operating Systems",
        "Interview Preparation",
      ],
    },
  };

  return (
    <div className="dashboard">
      <h1>Company Roadmap</h1>

      <p>
        Select your dream company and follow
        the recommended roadmap.
      </p>

      <div className="features">
        {Object.keys(roadmaps).map(
          (companyName) => (
            <div
              key={companyName}
              className="card"
              onClick={() =>
                setCompany(companyName)
              }
            >
              <h3>{companyName}</h3>

              <p>
                Readiness:{" "}
                {
                  roadmaps[companyName]
                    .readiness
                }
                %
              </p>
            </div>
          )
        )}
      </div>

      {company && (
        <div className="roadmap-result">
          <h2>{company} Roadmap</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${roadmaps[company].readiness}%`,
              }}
            ></div>
          </div>

          <p>
            Current Readiness:
            {" "}
            {
              roadmaps[company]
                .readiness
            }
            %
          </p>

          <br />

          <h3>Preparation Plan</h3>

          {roadmaps[company].steps.map(
            (step, index) => (
              <p key={step}>
                ✅ {index + 1}. {step}
              </p>
            )
          )}

          <br />

          <h3>
            Personalized Suggestion
          </h3>

          <p>
            Target Company:
            {" "}
            {profile.company ||
              "Not Selected"}
          </p>

          <p>
            Current CGPA:
            {" "}
            {profile.cgpa ||
              "Not Available"}
          </p>

          <p>
            Focus on completing all roadmap
            steps before placement season.
          </p>
        </div>
      )}
    </div>
  );
}

export default CompanyRoadmap;