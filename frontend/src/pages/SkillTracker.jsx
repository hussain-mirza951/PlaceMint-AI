import "../App.css";
import { useState, useEffect } from "react";

function SkillTracker() {
  const [skills, setSkills] = useState([
    {
      category: "Programming",
      name: "Java",
      completed: true,
    },
    {
      category: "Programming",
      name: "Python",
      completed: true,
    },
    {
      category: "DSA",
      name: "Data Structures",
      completed: false,
    },
    {
      category: "DSA",
      name: "Algorithms",
      completed: false,
    },
    {
      category: "Database",
      name: "SQL",
      completed: true,
    },
    {
      category: "Web Development",
      name: "React",
      completed: false,
    },
    {
      category: "System Design",
      name: "System Design",
      completed: false,
    },
    {
      category: "Programming",
      name: "OOP",
      completed: true,
    },
  ]);

  const completedSkills =
    skills.filter((skill) => skill.completed).length;

  const score = Math.round(
    (completedSkills / skills.length) * 100
  );

  useEffect(() => {
    localStorage.setItem(
      "skillsScore",
      score
    );
  }, [score]);

  const toggleSkill = (index) => {
    const updatedSkills = [...skills];

    updatedSkills[index].completed =
      !updatedSkills[index].completed;

    setSkills(updatedSkills);
  };

  const categories = [
    ...new Set(
      skills.map((skill) => skill.category)
    ),
  ];

  return (
    <div className="dashboard">
      <h1>Skill Tracker</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>🧠 Skill Score</h3>
          <h2>{score}%</h2>
        </div>

        <div className="stat-card">
          <h3>✅ Completed</h3>
          <h2>{completedSkills}</h2>
        </div>

        <div className="stat-card">
          <h3>📚 Total Skills</h3>
          <h2>{skills.length}</h2>
        </div>
      </div>

      <div className="panel">
        <h2>Overall Progress</h2>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${score}%`,
            }}
          ></div>
        </div>

        <p>{score}% Placement Skill Readiness</p>
      </div>

      {categories.map((category) => (
        <div
          className="panel"
          key={category}
          style={{ marginTop: "20px" }}
        >
          <h2>{category}</h2>

          <div className="features">
            {skills
              .filter(
                (skill) =>
                  skill.category === category
              )
              .map((skill) => {
                const actualIndex =
                  skills.findIndex(
                    (s) =>
                      s.name === skill.name
                  );

                return (
                  <div
                    key={skill.name}
                    className="card"
                    onClick={() =>
                      toggleSkill(actualIndex)
                    }
                  >
                    <h3>{skill.name}</h3>

                    <p>
                      {skill.completed
                        ? "✅ Completed"
                        : "❌ Pending"}
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkillTracker;