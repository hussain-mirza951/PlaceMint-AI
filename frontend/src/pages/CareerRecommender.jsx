import "../App.css";

function CareerRecommender() {
  const profile =
    JSON.parse(localStorage.getItem("profile")) || {};

  const aptitude =
    Number(localStorage.getItem("aptitudeScore")) || 0;

  const skills =
    (profile.skills || "")
      .toLowerCase()
      .split(",");

  let recommendations = [];

  if (
    skills.some((s) => s.includes("python")) &&
    skills.some((s) => s.includes("sql"))
  ) {
    recommendations.push({
      role: "Data Analyst",
      score: 90,
    });
  }

  if (
    skills.some((s) => s.includes("python")) &&
    skills.some((s) => s.includes("machine"))
  ) {
    recommendations.push({
      role: "Data Scientist",
      score: 95,
    });
  }

  if (
    skills.some((s) => s.includes("tensorflow")) ||
    skills.some((s) => s.includes("pytorch"))
  ) {
    recommendations.push({
      role: "ML Engineer",
      score: 92,
    });
  }

  if (
    skills.some((s) => s.includes("react")) ||
    skills.some((s) => s.includes("java"))
  ) {
    recommendations.push({
      role: "Software Engineer",
      score: 85,
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      role: "Software Engineer",
      score: 70,
    });
  }

  recommendations.sort(
    (a, b) => b.score - a.score
  );

  return (
    <div className="dashboard">
      <h1>🤖 AI Career Recommender</h1>

      <div className="roadmap-result">
        <h2>
          Recommended Career Paths
        </h2>

        {recommendations.map((item) => (
          <div key={item.role}>
            <p>
              <strong>
                {item.role}
              </strong>
              {" - "}
              {item.score}%
            </p>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${item.score}%`,
                }}
              ></div>
            </div>

            <br />
          </div>
        ))}

        <h3>Profile Summary</h3>

        <p>CGPA: {profile.cgpa}</p>

        <p>
          Aptitude Score: {aptitude}
        </p>
      </div>
    </div>
  );
}

export default CareerRecommender;