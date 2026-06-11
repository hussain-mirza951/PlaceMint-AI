import "../App.css";

function Readiness() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const aptitudeScore =
    Number(localStorage.getItem("aptitudeScore")) || 60;

  const resumeScore =
    Number(localStorage.getItem("resumeScore")) || 0;

  const skillsScore =
    Number(localStorage.getItem("skillsScore")) || 0;

  const cgpaScore =
    Math.min(100, (Number(profile.cgpa) || 0) * 10);

  const profileCompletion =
    [
      profile.name,
      profile.branch,
      profile.cgpa,
      profile.company,
      profile.year,
    ].filter(Boolean).length * 20;

  const overallScore = Math.round(
    (
      aptitudeScore +
      resumeScore +
      skillsScore +
      cgpaScore +
      profileCompletion
    ) / 5
  );

  const strengths = [];
  const weaknesses = [];

  if (cgpaScore >= 80)
    strengths.push("Strong Academic Record");
  else
    weaknesses.push("Improve Academic Performance");

  if (aptitudeScore >= 80)
    strengths.push("Strong Aptitude Skills");
  else
    weaknesses.push("Practice Aptitude Tests");

  if (resumeScore >= 80)
    strengths.push("Good Resume Quality");
  else
    weaknesses.push("Improve Resume ATS Score");

  if (skillsScore >= 70)
    strengths.push("Strong Technical Skills");
  else
    weaknesses.push("Complete More Technical Skills");

  if (profileCompletion >= 80)
    strengths.push("Complete Professional Profile");
  else
    weaknesses.push("Complete Your Profile");

  return (
    <div className="dashboard">
      <h1>Placement Readiness</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>🚀 Overall Readiness</h3>
          <h2>{overallScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>🎓 CGPA Score</h3>
          <h2>{cgpaScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>📄 Resume Score</h3>
          <h2>{resumeScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>📝 Aptitude Score</h3>
          <h2>{aptitudeScore}%</h2>
        </div>

        <div className="stat-card">
          <h3>🧠 Skill Score</h3>
          <h2>{skillsScore}%</h2>
        </div>
      </div>

      <div className="roadmap-result">
        <h2>{profile.name || "Student"}</h2>

        <p>
          <strong>Target Company:</strong>{" "}
          {profile.company || "Not Selected"}
        </p>

        <p>
          <strong>CGPA:</strong>{" "}
          {profile.cgpa || "Not Entered"}
        </p>

        <br />

        <h3>Readiness Progress</h3>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${overallScore}%`,
            }}
          ></div>
        </div>

        <p>{overallScore}% Ready</p>

        <br />

        <h3>✅ Strengths</h3>

        {strengths.map((item) => (
          <p key={item}>{item}</p>
        ))}

        <br />

        <h3>⚠ Areas to Improve</h3>

        {weaknesses.map((item) => (
          <p key={item}>{item}</p>
        ))}

        <br />

        <h3>🎯 Company Recommendations</h3>

        {profile.company === "Google" && (
          <>
            <p>✓ Learn System Design</p>
            <p>✓ Practice Competitive Programming</p>
            <p>✓ Solve LeetCode Daily</p>
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
            <p>✓ Practice Behavioral Interviews</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Readiness;