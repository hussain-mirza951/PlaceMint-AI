import "../App.css";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to PlaceMint AI</h1>

      <div className="features">
        <Link to="/profile">
          <div className="card">
            <h3>Student Profile</h3>
            <p>Manage your profile and goals.</p>
          </div>
        </Link>

        <Link to="/resume">
          <div className="card">
            <h3>Resume Analyzer</h3>
            <p>Analyze and improve your resume.</p>
          </div>
        </Link>

        <Link to="/skills">
          <div className="card">
            <h3>Skill Tracker</h3>
            <p>Track your progress and missing skills.</p>
          </div>
        </Link>

        <Link to="/roadmap">
          <div className="card">
            <h3>Company Roadmap</h3>
            <p>Prepare for target companies.</p>
          </div>
        </Link>

        <Link to="/readiness">
          <div className="card">
            <h3>Placement Readiness</h3>
            <p>View your readiness score.</p>
          </div>
        </Link>

        <Link to="/aptitude">
          <div className="card">
            <h3>Aptitude Practice</h3>
            <p>Practice placement aptitude tests.</p>
          </div>
        </Link>

        <Link to="/eligibility">
          <div className="card">
            <h3>Eligibility Checker</h3>
            <p>Check company criteria and profile gaps.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
