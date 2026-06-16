import "../App.css";

function QuickStats() {
  const mockTests =
    Number(localStorage.getItem("mockTests")) || 12;
  const skillBadges =
    Number(localStorage.getItem("skillBadges")) || 84;
  const projects =
    Number(localStorage.getItem("projects")) || 3;
  const consistency =
    Number(localStorage.getItem("consistency")) || 91;

  const stats = [
    { value: mockTests,          label: "Mock Tests" },
    { value: skillBadges,        label: "Skill Badges" },
    { value: projects,           label: "Projects" },
    { value: `${consistency}%`,  label: "Consistency" },
  ];

  return (
    <div className="quick-stats">
      {stats.map(({ value, label }) => (
        <div className="quick-stat-card" key={label}>
          <h3>{value}</h3>
          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;
