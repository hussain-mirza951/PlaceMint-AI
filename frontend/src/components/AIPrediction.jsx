function AIPrediction() {
  return (
    <div className="prediction-card">
      <h2>AI Prediction</h2>

      <div className="prediction-circle">
        37%
      </div>

      <p className="prediction-text">
        Your profile is currently below
        Google's placement threshold.
      </p>

      <div className="prediction-actions">
        <div>✓ Improve DSA</div>
        <div>✓ Upload Resume</div>
        <div>✓ Add Projects</div>
      </div>

      <button className="primary-btn">
        Generate Roadmap
      </button>
    </div>
  );
}

export default AIPrediction;