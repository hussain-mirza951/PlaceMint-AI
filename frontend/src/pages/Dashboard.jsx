import "../App.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const aptitudeScore =
    Number(localStorage.getItem("aptitudeScore")) || 60;

  const resumeScore =
    Number(localStorage.getItem("resumeScore")) || 0;

  const skillsScore =
    Number(localStorage.getItem("skillsScore")) || 0;

  const readinessScore = Math.round(
    (aptitudeScore + resumeScore + skillsScore) / 3
  );

  const cgpa = profile.cgpa || "Not Set";
  const company = profile.company || "Not Selected";
  const name = profile.name || "Student";

  const placementPrediction =
    readinessScore >= 80
      ? "Excellent"
      : readinessScore >= 60
      ? "Good"
      : "Needs Improvement";

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {name}</h1>
        <p>
          Your AI-powered placement preparation hub
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>🎓 CGPA</h3>
          <h2>{cgpa}</h2>
        </div>

        <div className="stat-card">
          <h3>🏢 Target Company</h3>
          <h2>{company}</h2>
        </div>

        <div className="stat-card">
          <h3>🚀 Readiness</h3>
          <h2>{readinessScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>📄 Resume</h3>
          <h2>{resumeScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>🧠 Skills</h3>
          <h2>{skillsScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>📝 Aptitude</h3>
          <h2>{aptitudeScore}%</h2>
        </div>
      </div>

      <div className="dashboard-panels">
        <div className="panel">
          <h2>📊 Performance Analytics</h2>

          <p>Resume Score</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${resumeScore}%`,
              }}
            ></div>
          </div>

          <br />

          <p>Skill Score</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${skillsScore}%`,
              }}
            ></div>
          </div>

          <br />

          <p>Aptitude Score</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${aptitudeScore}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="panel">
          <h2>🎯 Placement Prediction</h2>

          <h3>{placementPrediction}</h3>

          <p>
            Current Readiness:
            {" "}
            {readinessScore}%
          </p>

          <p>
            Dream Company:
            {" "}
            {company}
          </p>

          <p>
            Continue improving your Resume,
            Skills and Aptitude scores to
            maximize placement chances.
          </p>
        </div>
      </div>

      <div className="panel">
        <h2>🏆 Dream Company Match</h2>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Google</h3>
            <h2>
              {Math.max(
                0,
                readinessScore - 10
              )}
              %
            </h2>
          </div>

          <div className="stat-card">
            <h3>Amazon</h3>
            <h2>{readinessScore}%</h2>
          </div>

          <div className="stat-card">
            <h3>Microsoft</h3>
            <h2>
              {Math.max(
                0,
                readinessScore - 5
              )}
              %
            </h2>
          </div>

          <div className="stat-card">
            <h3>Infosys</h3>
            <h2>
              {Math.min(
                100,
                readinessScore + 10
              )}
              %
            </h2>
          </div>

          <div className="stat-card">
            <h3>TCS</h3>
            <h2>
              {Math.min(
                100,
                readinessScore + 15
              )}
              %
            </h2>
          </div>
        </div>
      </div>

      <h2 className="section-title">
        Quick Actions
      </h2>

      <div className="features">
        <Link to="/profile">
          <div className="card">
            <h3>👤 Profile</h3>
          </div>
        </Link>

        <Link to="/resume">
          <div className="card">
            <h3>📄 Resume Analyzer</h3>
          </div>
        </Link>

        <Link to="/skills">
          <div className="card">
            <h3>🧠 Skill Tracker</h3>
          </div>
        </Link>

        <Link to="/roadmap">
          <div className="card">
            <h3>🛣 Roadmap</h3>
          </div>
        </Link>

        <Link to="/readiness">
          <div className="card">
            <h3>📈 Readiness</h3>
          </div>
        </Link>

        <Link to="/eligibility">
          <div className="card">
            <h3>🎯 Eligibility</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;