import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import {
  LayoutDashboard,
  User,
  FileText,
  Brain,
  BarChart3,
  Target,
  Route,
  ClipboardList,
  Mic,
  Bot,
  Sparkles,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/resume", icon: FileText, label: "Resume Analyzer" },
    { path: "/skills", icon: Brain, label: "Skill Tracker" },
    { path: "/readiness", icon: BarChart3, label: "Readiness" },
    { path: "/eligibility", icon: Target, label: "Eligibility" },
    { path: "/roadmap", icon: Route, label: "Roadmaps" },
    { path: "/aptitude", icon: ClipboardList, label: "Aptitude" },
    { path: "/interview", icon: Mic, label: "Interview Prep" },
    { path: "/predictor", icon: Bot, label: "Placement Predictor" },
    { path: "/career", icon: Sparkles, label: "AI Career Guide" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>PlaceMint AI</h2>
        <p>Elite Intelligence Platform</p>
      </div>

      <div className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <motion.div
              key={item.path}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={item.path}
                className={
                  active
                    ? "sidebar-link active-link"
                    : "sidebar-link"
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;