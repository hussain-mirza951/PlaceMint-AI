import "../App.css";

function Readiness() {
  const profile = {
    name: "Ali",
    cgpa: 8.42,
    company: "Google",
  };

  let resumeScore = 80;
  let skillsScore = 75;
  let projectsScore = 90;
  let aptitudeScore = 60;

  let bonus = 0;

  if (profile.cgpa >= 8.5) {
    bonus += 5;
  }

  const overallScore = Math.min(
    100,
    Math.round(
      (
        resumeScore +
        skillsScore +
        projectsScore +
        aptitudeScore
      ) / 4 + bonus
    )
  );

  return (
    <div className="dashboard">
      <h1>Placement Readiness</h1>

      <div className="roadmap-result">
        <h2>{profile.name}</h2>

        <p>Target Company: {profile.company}</p>

        <p>CGPA: {profile.cgpa}</p>

        <h2>Overall Readiness: {overallScore}%</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>

        <br />

        <h3>Recommendations</h3>

        {profile.company === "Google" && (
          <>
            <p>✓ Learn System Design</p>
            <p>✓ Practice Competitive Programming</p>
            <p>✓ Solve LeetCode Medium Questions</p>
          </>
        )}

        {profile.company === "Amazon" && (
          <>
            <p>✓ Master DSA</p>
            <p>✓ Build Backend Projects</p>
            <p>✓ Practice OA Questions</p>
          </>
        )}

        {profile.company === "Microsoft" && (
          <>
            <p>✓ Strengthen OOP Concepts</p>
            <p>✓ Build Full Stack Projects</p>
            <p>✓ Practice Behavioral Questions</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Readiness;