import "../App.css";
import { useMemo, useState } from "react";

const companyCriteria = {
  Google: {
    minCgpa: 8.5,
    maxBacklogs: 0,
    requiredSkills: ["Data Structures", "System Design", "Competitive Programming"],
  },
  Amazon: {
    minCgpa: 7.5,
    maxBacklogs: 0,
    requiredSkills: ["Data Structures", "OOP", "Backend Projects"],
  },
  Microsoft: {
    minCgpa: 8,
    maxBacklogs: 1,
    requiredSkills: ["Data Structures", "OOP", "Full Stack Projects"],
  },
};

function Eligibility() {
  const savedProfile = JSON.parse(localStorage.getItem("profile")) || {};
  const defaultCompany = savedProfile.company || "Amazon";

  const [criteria, setCriteria] = useState(() => ({
    company: defaultCompany,
    minCgpa: companyCriteria[defaultCompany]?.minCgpa || 7.5,
    maxBacklogs: companyCriteria[defaultCompany]?.maxBacklogs || 0,
    backlogs: 0,
    skills: "",
  }));

  const profileCgpa = Number(savedProfile.cgpa) || 0;

  const requiredSkills = useMemo(
    () => companyCriteria[criteria.company]?.requiredSkills || [],
    [criteria.company]
  );

  const enteredSkills = useMemo(
    () =>
      criteria.skills
        .split(",")
        .map((skill) => skill.trim().toLowerCase())
        .filter(Boolean),
    [criteria.skills]
  );

  const missingSkills = requiredSkills.filter(
    (skill) => !enteredSkills.includes(skill.toLowerCase())
  );

  const cgpaGap = Math.max(0, criteria.minCgpa - profileCgpa);
  const backlogGap = Number(criteria.backlogs) > Number(criteria.maxBacklogs);
  const isEligible = cgpaGap === 0 && !backlogGap && missingSkills.length === 0;

  const handleCompanyChange = (event) => {
    const company = event.target.value;
    const selectedCriteria = companyCriteria[company];

    setCriteria((current) => ({
      ...current,
      company,
      minCgpa: selectedCriteria.minCgpa,
      maxBacklogs: selectedCriteria.maxBacklogs,
    }));
  };

  const handleChange = (event) => {
    setCriteria({
      ...criteria,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="dashboard">
      <h1>Eligibility Checker</h1>

      <div className="eligibility-layout">
        <div className="eligibility-panel">
          <h2>Student Snapshot</h2>
          <p>
            <strong>Name:</strong> {savedProfile.name || "Not entered"}
          </p>
          <p>
            <strong>Branch:</strong> {savedProfile.branch || "Not entered"}
          </p>
          <p>
            <strong>CGPA:</strong> {savedProfile.cgpa || "Not entered"}
          </p>
          <p>
            <strong>Target:</strong> {savedProfile.company || "Not selected"}
          </p>
        </div>

        <div className="eligibility-panel">
          <h2>Company Criteria</h2>

          <select
            name="company"
            value={criteria.company}
            onChange={handleCompanyChange}
          >
            {Object.keys(companyCriteria).map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="minCgpa"
            step="0.1"
            min="0"
            max="10"
            value={criteria.minCgpa}
            onChange={handleChange}
            placeholder="Minimum CGPA"
          />

          <input
            type="number"
            name="maxBacklogs"
            min="0"
            value={criteria.maxBacklogs}
            onChange={handleChange}
            placeholder="Allowed Backlogs"
          />

          <input
            type="number"
            name="backlogs"
            min="0"
            value={criteria.backlogs}
            onChange={handleChange}
            placeholder="Your Active Backlogs"
          />

          <input
            type="text"
            name="skills"
            value={criteria.skills}
            onChange={handleChange}
            placeholder="Your skills, comma separated"
          />
        </div>
      </div>

      <div className={`eligibility-result ${isEligible ? "eligible" : "not-eligible"}`}>
        <h2>{isEligible ? "Eligible" : "Not Eligible Yet"}</h2>
        <p>
          {isEligible
            ? "You meet the current company criteria."
            : "Close the gaps below before applying."}
        </p>

        <div className="eligibility-checks">
          <p>
            CGPA:{" "}
            {cgpaGap === 0
              ? "Meets requirement"
              : `Needs ${cgpaGap.toFixed(1)} more`}
          </p>
          <p>
            Backlogs:{" "}
            {!backlogGap
              ? "Within limit"
              : `Reduce to ${criteria.maxBacklogs} or fewer`}
          </p>
          <p>
            Skills:{" "}
            {missingSkills.length === 0
              ? "All required skills covered"
              : missingSkills.join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Eligibility;
