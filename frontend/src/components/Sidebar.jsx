import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      path: "/dashboard",
      icon: "📊",
      label: "Dashboard",
    },
    {
      path: "/profile",
      icon: "👤",
      label: "Profile",
    },
    {
      path: "/resume",
      icon: "📄",
      label: "Resume Analyzer",
    },
    {
      path: "/skills",
      icon: "🧠",
      label: "Skill Tracker",
    },
    {
      path: "/readiness",
      icon: "📈",
      label: "Readiness",
    },
    {
      path: "/eligibility",
      icon: "🎯",
      label: "Eligibility",
    },
    {
      path: "/roadmap",
      icon: "🛣️",
      label: "Roadmaps",
    },
    {
      path: "/aptitude",
      icon: "📝",
      label: "Aptitude",
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>🚀 PlaceMint AI</h2>
        <p>Placement Intelligence Platform</p>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "sidebar-link active-link"
                : "sidebar-link"
            }
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;