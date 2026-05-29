import "../App.css";
import { Link } from "react-router-dom";
function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Welcome to PlaceMint AI</h1>

      <p>Your placement preparation dashboard.</p>

      <div className="features">
        <Link to="/resume">
  <div className="card">
    <h3>Resume Analyzer</h3>
    <p>Analyze and improve your resume.</p>
  </div>
</Link>

        <div className="card">
          <h3>Skill Tracker</h3>
          <p>Track your progress and missing skills.</p>
        </div>

        <div className="card">
          <h3>Company Roadmap</h3>
          <p>Prepare for target companies step by step.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;