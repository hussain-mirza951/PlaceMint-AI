import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>PlaceMint AI</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/resume">Resume Analyzer</Link>
      <Link to="/skilltracker">Skill Tracker</Link>
      <Link to="/readiness">Readiness</Link>
      <Link to="/companyroadmap">Roadmaps</Link>
    </div>
  );
}

export default Sidebar;