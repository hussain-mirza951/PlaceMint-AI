import "../App.css";
import { useState } from "react";

function SkillTracker() {
  const [skills, setSkills] = useState([
    { name: "Java", completed: true },
    { name: "Python", completed: true },
    { name: "Data Structures", completed: false },
    { name: "System Design", completed: false },
  ]);

  const toggleSkill = (index) => {
    const updatedSkills = [...skills];

    updatedSkills[index].completed =
      !updatedSkills[index].completed;

    setSkills(updatedSkills);
  };

  return (
    <div className="dashboard">
      <h1>Skill Tracker</h1>

      <div className="features">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="card"
            onClick={() => toggleSkill(index)}
          >
            <h3>{skill.name}</h3>

            <p>
              {skill.completed
                ? "✅ Completed"
                : "❌ Not Completed"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillTracker;