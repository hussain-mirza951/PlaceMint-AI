import "../App.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h2>🚀 PlaceMint AI</h2>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#why">Why PlaceMint</a>

          <Link to="/login">
            <button className="primary-btn">
              Login
            </button>
          </Link>
        </div>
      </nav>

      <section className="hero">
        <h1>
          Your AI-Powered Placement
          <br />
          Preparation Platform
        </h1>

        <p>
          Resume Analysis, Placement Readiness,
          Skill Tracking, Company Roadmaps,
          Eligibility Prediction and Aptitude
          Preparation — all in one platform.
        </p>

        <div className="buttons">
          <Link to="/dashboard">
            <button className="primary-btn">
              Start Preparing
            </button>
          </Link>

          <Link to="/profile">
            <button className="secondary-btn">
              Build Profile
            </button>
          </Link>
        </div>
      </section>

      <section
        id="features"
        className="features"
      >
        <div className="card">
          <h3>📄 Resume Analyzer</h3>

          <p>
            ATS scoring, skill extraction and
            improvement suggestions.
          </p>
        </div>

        <div className="card">
          <h3>🧠 Skill Tracker</h3>

          <p>
            Monitor technical skills and track
            preparation progress.
          </p>
        </div>

        <div className="card">
          <h3>🎯 Eligibility Checker</h3>

          <p>
            Check company eligibility instantly
            using your profile.
          </p>
        </div>

        <div className="card">
          <h3>🛣 Roadmaps</h3>

          <p>
            Personalized preparation paths for
            Google, Amazon, Microsoft and more.
          </p>
        </div>
      </section>

      <section
        id="why"
        className="highlights"
      >
        <div className="highlight">
          <h3>📊 Placement Analytics</h3>

          <p>
            Measure readiness using dynamic
            scoring.
          </p>
        </div>

        <div className="highlight">
          <h3>🏆 Dream Company Match</h3>

          <p>
            Compare your profile against top
            companies.
          </p>
        </div>

        <div className="highlight">
          <h3>🚀 AI Career Guidance</h3>

          <p>
            Personalized recommendations for
            placement success.
          </p>
        </div>
      </section>

      <footer
        style={{
          textAlign: "center",
          padding: "50px",
          color: "#94a3b8",
        }}
      >
        © 2026 PlaceMint AI • Placement
        Intelligence Platform
      </footer>
    </div>
  );
}

export default Home;