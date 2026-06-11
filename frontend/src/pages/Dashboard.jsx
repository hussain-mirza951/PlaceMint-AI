import "../App.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const aptitudeScore =
    Number(localStorage.getItem("aptitudeScore")) * 20 || 60;

  const cgpa = profile.cgpa || "Not Set";
  const company = profile.company || "Not Selected";
  const name = profile.name || "Student";

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {name}</h1>
        <p>Track your placement journey with PlaceMint AI</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>CGPA</h3>
          <h2>{cgpa}</h2>
        </div>

        <div className="stat-card">
          <h3>Target Company</h3>
          <h2>{company}</h2>
        </div>

        <div className="stat-card">
          <h3>Aptitude Score</h3>
          <h2>{aptitudeScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>Readiness</h3>
          <h2>76%</h2>
        </div>
      </div>

      <h2 className="section-title">Modules</h2>

      <div className="features">
        <Link to="/profile">
          <div className="card">
            <h3>👤 Student Profile</h3>
            <p>Manage your profile and goals.</p>
          </div>
        </Link>

        <Link to="/resume">
          <div className="card">
            <h3>📄 Resume Analyzer</h3>
            <p>Analyze and improve your resume.</p>
          </div>
        </Link>

        <Link to="/skills">
          <div className="card">
            <h3>🧠 Skill Tracker</h3>
            <p>Track your progress and missing skills.</p>
          </div>
        </Link>

        <Link to="/roadmap">
          <div className="card">
            <h3>🛣 Company Roadmap</h3>
            <p>Prepare for target companies.</p>
          </div>
        </Link>

        <Link to="/readiness">
          <div className="card">
            <h3>📈 Placement Readiness</h3>
            <p>View your readiness score.</p>
          </div>
        </Link>

        <Link to="/aptitude">
          <div className="card">
            <h3>📝 Aptitude Practice</h3>
            <p>Practice placement aptitude tests.</p>
          </div>
        </Link>

        <Link to="/eligibility">
          <div className="card">
            <h3>🎯 Eligibility Checker</h3>
            <p>Check company criteria and profile gaps.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;