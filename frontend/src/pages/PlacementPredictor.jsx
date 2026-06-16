import "../App.css";

function PlacementPredictor() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const aptitudeScore =
    Number(localStorage.getItem("aptitudeScore")) || 0;

  const resumeScore =
    Number(localStorage.getItem("resumeScore")) || 0;

  const skillsScore =
    Number(localStorage.getItem("skillsScore")) || 0;

  const cgpaScore =
    (Number(profile.cgpa) || 0) * 10;

  const predictionScore = Math.round(
    (
      aptitudeScore +
      resumeScore +
      skillsScore +
      cgpaScore
    ) / 4
  );

  let predictedCompanies = [];

  if (predictionScore >= 85) {
    predictedCompanies = [
      "Google",
      "Microsoft",
      "Amazon",
    ];
  } else if (predictionScore >= 75) {
    predictedCompanies = [
      "Oracle",
      "Adobe",
      "Salesforce",
    ];
  } else if (predictionScore >= 65) {
    predictedCompanies = [
      "Deloitte",
      "IBM",
      "Accenture",
    ];
  } else {
    predictedCompanies = [
      "TCS",
      "Infosys",
      "Capgemini",
    ];
  }

  return (
    <div className="dashboard">
      <h1>🤖 Placement Predictor</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Prediction Score</h3>
          <h2>{predictionScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>CGPA Score</h3>
          <h2>{cgpaScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>Resume Score</h3>
          <h2>{resumeScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>Skills Score</h3>
          <h2>{skillsScore}%</h2>
        </div>
      </div>

      <div className="roadmap-result">
        <h2>🎯 Predicted Companies</h2>

        {predictedCompanies.map((company) => (
          <p key={company}>✅ {company}</p>
        ))}

        <br />

        <h2>📈 Recommendation</h2>

        <p>
          Improve Aptitude, Resume and
          Project Quality to unlock higher
          tier companies.
        </p>
      </div>
    </div>
  );
}

export default PlacementPredictor;