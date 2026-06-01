import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import SkillTracker from "./pages/SkillTracker";
import CompanyRoadmap from "./pages/CompanyRoadmap";
function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/resume" element={<Resume />} />
  <Route path="/skills" element={<SkillTracker />} />
  <Route path="/roadmap" element={<CompanyRoadmap />} />
</Routes>
    </BrowserRouter>
  );
}

export default App;