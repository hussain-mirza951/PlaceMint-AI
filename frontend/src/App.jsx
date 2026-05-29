import "./App.css";

function App() {
  return (
    <div>
      <nav className="navbar">
        <h2>PlaceMint AI</h2>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Features</a>
          <a href="#">About</a>
          <a href="#">Login</a>
        </div>
      </nav>

      <section className="hero">
        <h1>Ace Your Placements with AI</h1>

        <p>
          Personalized roadmaps, resume analysis, interview preparation,
          and placement tracking all in one platform.
        </p>

        <div className="buttons">
          <button className="primary-btn">Get Started</button>
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
      </section>
    </div>
    
  );
}

export default App;