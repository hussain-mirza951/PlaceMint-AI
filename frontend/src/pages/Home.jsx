import "../App.css";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <nav className="navbar">
        <h2>PlaceMint AI</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <Link to="/login">Login</Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Ace Your Placements with AI</h1>

        <p>
          Personalized roadmaps, resume analysis, interview preparation,
          and placement tracking all in one platform.
        </p>

        <div className="buttons">
          <Link to="/login">
  <button className="primary-btn">Get Started</button>
</Link>
          <button className="secondary-btn">Learn More</button>
        </div>

        <div className="features">
          <div className="card">
            <h3>Resume Analysis</h3>
            <p>Upload your resume and get AI-powered feedback.</p>
          </div>

          <div className="card">
            <h3>Interview Prep</h3>
            <p>Practice company-specific interview questions.</p>
          </div>

          <div className="card">
            <h3>Placement Roadmap</h3>
            <p>Get a personalized path to your dream company.</p>
          </div>
        </div>

        <div className="highlights">
          <div className="highlight">
            <h3>AI Resume Analysis</h3>
            <p>Identify strengths, weaknesses, and missing skills.</p>
          </div>

          <div className="highlight">
            <h3>Skill Gap Detection</h3>
            <p>Compare your profile against target company requirements.</p>
          </div>

          <div className="highlight">
            <h3>Company Readiness Tracking</h3>
            <p>Track your preparation progress for dream companies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;