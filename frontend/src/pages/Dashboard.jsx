import "../App.css";
import { Link } from "react-router-dom";

import {
  GraduationCap,
  FileText,
  Brain,
  Target,
  Building2,
  Trophy,
} from "lucide-react";

import StatCard from "../components/StatCard";
import AnalyticsPanel from "../components/AnalyticsPanel";
import AIPrediction from "../components/AIPrediction";
import QuickStats from "../components/QuickStats";

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

  const cgpa    = profile.cgpa    || "Not Set";
  const company = profile.company || "Not Selected";
  const name    = profile.name    || "Student";

  return (
    <div className="dashboard">

      {/* Premium Header — single class, no conflict */}
      <div className="premium-header">
        <div>
          <span className="dashboard-badge">
            AI Placement Intelligence Active
          </span>

          <h1 className="gradient-heading">
            Welcome Back, {name}
          </h1>

          <p className="dashboard-subtitle">
            Your journey toward{" "}
            <strong>{company}</strong> is{" "}
            <strong>{readinessScore}%</strong> complete.
            Continue improving your resume, aptitude, and
            technical skills to maximize placement success.
          </p>
        </div>

        <div className="header-actions">
          <Link to="/profile">
            <button className="secondary-btn">Edit Profile</button>
          </Link>
          <Link to="/roadmap">
            <button className="primary-btn">Generate Roadmap</button>
          </Link>
        </div>
      </div>

      {/* 6-card Stats Grid */}
      <div className="stats-grid">
        <StatCard title="CGPA"      value={cgpa}               icon={<GraduationCap />} />
        <StatCard title="Resume"    value={`${resumeScore}%`}  icon={<FileText />} />
        <StatCard title="Skills"    value={`${skillsScore}%`}  icon={<Brain />} />
        <StatCard title="Aptitude"  value={`${aptitudeScore}%`} icon={<Target />} />
        <StatCard title="Readiness" value={`${readinessScore}%`} icon={<Trophy />} />
        <StatCard title="Target"    value={company}            icon={<Building2 />} />
      </div>

      {/* Analytics + AI Prediction side-by-side */}
      <div className="dashboard-v2-grid">
        <AnalyticsPanel />
        <AIPrediction />
      </div>

      {/* Quick Stats row — 4 metric tiles */}
      <QuickStats />

      {/* Dream Company Match */}
      <div className="panel" style={{ padding: "28px", marginBottom: "32px" }}>
        <h2 style={{ marginTop: 0, color: "#60a5fa" }}>Dream Company Match</h2>

        <div className="company-match-grid">
          <div className="company-chip">
            Google
            <span>{Math.max(0, readinessScore - 10)}%</span>
          </div>
          <div className="company-chip">
            Amazon
            <span>{readinessScore}%</span>
          </div>
          <div className="company-chip">
            Microsoft
            <span>{Math.max(0, readinessScore - 5)}%</span>
          </div>
          <div className="company-chip">
            Infosys
            <span>{Math.min(100, readinessScore + 10)}%</span>
          </div>
          <div className="company-chip">
            TCS
            <span>{Math.min(100, readinessScore + 15)}%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="section-title">Quick Actions</h2>

      <div className="quick-actions-grid">
        <Link to="/profile">
          <div className="action-card">👤 Profile</div>
        </Link>
        <Link to="/resume">
          <div className="action-card">📄 Resume Analyzer</div>
        </Link>
        <Link to="/skills">
          <div className="action-card">🧠 Skill Tracker</div>
        </Link>
        <Link to="/roadmap">
          <div className="action-card">🛣 Roadmaps</div>
        </Link>
        <Link to="/eligibility">
          <div className="action-card">🎯 Eligibility</div>
        </Link>
        <Link to="/readiness">
          <div className="action-card">📈 Readiness</div>
        </Link>
      </div>

    </div>
  );
}

export default Dashboard;
