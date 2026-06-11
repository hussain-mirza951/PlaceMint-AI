import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import SkillTracker from "./pages/SkillTracker";
import CompanyRoadmap from "./pages/CompanyRoadmap";
import Readiness from "./pages/Readiness";
import Profile from "./pages/Profile";
import Aptitude from "./pages/Aptitude";
import Eligibility from "./pages/Eligibility";

function Layout() {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/" ||
    location.pathname === "/login";

  return (
    <div className="app-layout">
      {!hideSidebar && <Sidebar />}

      <div
        className={
          hideSidebar
            ? "full-page-content"
            : "main-content"
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/skills" element={<SkillTracker />} />
          <Route path="/roadmap" element={<CompanyRoadmap />} />
          <Route path="/readiness" element={<Readiness />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/eligibility" element={<Eligibility />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;