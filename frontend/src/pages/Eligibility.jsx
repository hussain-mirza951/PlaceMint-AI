import "../App.css";
import { useState } from "react";

const initialForm = {
  cgpa: "",
  graduationYear: "",
  branch: "",
  backlogs: "",
  skills: "",
};

const branches = [
  "CSE",
  "IT",
  "ECE",
  "EEE",
  "Mechanical",
  "Civil",
];

function Eligibility() {
  const [form, setForm] = useState(() => {
    const savedProfile = safeParseProfile();

    return {
      ...initialForm,
      cgpa: savedProfile.cgpa || "",
      graduationYear: savedProfile.year || "",
      branch: savedProfile.branch || "",
    };
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const nextErrors = {};
    const cgpa = Number(form.cgpa);
    const graduationYear = Number(form.graduationYear);
    const backlogs = Number(form.backlogs);

    if (!form.cgpa || Number.isNaN(cgpa) || cgpa < 0 || cgpa > 10) {
      nextErrors.cgpa = "Enter a CGPA between 0 and 10.";
    }

    if (
      !form.graduationYear ||
      Number.isNaN(graduationYear) ||
      graduationYear < 2024 ||
      graduationYear > 2031
    ) {
      nextErrors.graduationYear = "Enter a valid graduation year.";
    }

    if (!form.branch.trim()) {
      nextErrors.branch = "Select your branch.";
    }

    if (form.backlogs === "" || Number.isNaN(backlogs) || backlogs < 0) {
      nextErrors.backlogs = "Enter active backlogs as 0 or more.";
    }

    if (!form.skills.trim()) {
      nextErrors.skills = "Enter at least one skill.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const checkEligibility = async (event) => {
    event.preventDefault();
    setSubmitError("");
    setResult(null);

    if (!validateForm()) {
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch("/api/eligibility/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          cgpa: Number(form.cgpa),
          graduationYear: Number(form.graduationYear),
          backlogs: Number(form.backlogs),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
        throw new Error("Please fix the highlighted fields.");
      }

      setResult(data);
    } catch (error) {
      setSubmitError(error.message || "Eligibility check failed.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="dashboard eligibility-page">
      <div className="eligibility-header">
        <h1>Eligibility Checker</h1>
        <p>
          Check campus placement eligibility across top service and product companies.
        </p>
      </div>

      <form className="eligibility-form" onSubmit={checkEligibility}>
        <div className="form-grid">
          <Field label="CGPA" error={errors.cgpa}>
            <input
              type="number"
              name="cgpa"
              min="0"
              max="10"
              step="0.01"
              value={form.cgpa}
              onChange={handleChange}
              placeholder="8.2"
            />
          </Field>

          <Field label="Graduation Year" error={errors.graduationYear}>
            <input
              type="number"
              name="graduationYear"
              min="2024"
              max="2031"
              value={form.graduationYear}
              onChange={handleChange}
              placeholder="2026"
            />
          </Field>

          <Field label="Branch" error={errors.branch}>
            <select name="branch" value={form.branch} onChange={handleChange}>
              <option value="">Select Branch</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Active Backlogs" error={errors.backlogs}>
            <input
              type="number"
              name="backlogs"
              min="0"
              value={form.backlogs}
              onChange={handleChange}
              placeholder="0"
            />
          </Field>
        </div>

        <Field label="Skills" error={errors.skills}>
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Data Structures, Algorithms, SQL, Communication"
          />
        </Field>

        <button className="primary-btn" type="submit" disabled={isChecking}>
          {isChecking ? "Checking..." : "Check Eligibility"}
        </button>

        {submitError && <p className="form-error">{submitError}</p>}
      </form>

      {result && <EligibilityResults result={result} />}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="eligibility-field">
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  );
}

function EligibilityResults({ result }) {
  return (
    <section className="eligibility-results">

      <div className="eligibility-summary">
        <div>
          <span>Overall Eligibility</span>
          <strong>
            {result.eligibilityPercentage}%
          </strong>
        </div>

        <div>
          <span>Eligible Companies</span>
          <strong>
            {result.eligibleCompanies.length}
          </strong>
        </div>

        <div>
          <span>Needs Work</span>
          <strong>
            {result.notEligibleCompanies.length}
          </strong>
        </div>
      </div>

      {result.bestMatch && (
        <div className="roadmap-result">
          <h2>🏆 Best Match Company</h2>

          <h1>
            {result.bestMatch.company}
          </h1>

          <h3>
            Match Score:
            {" "}
            {result.bestMatch.eligibilityPercentage}%
          </h3>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${result.bestMatch.eligibilityPercentage}%`,
              }}
            ></div>
          </div>
        </div>
      )}

      {result.topMatches &&
        result.topMatches.length > 0 && (
          <div className="roadmap-result">
            <h2>🥇 Top Company Matches</h2>

            {result.topMatches.map(
              (company, index) => (
                <div
                  key={company.company}
                  style={{
                    marginBottom: "20px",
                  }}
                >
                  <p>
                    <strong>
                      #{index + 1}
                    </strong>
                    {" "}
                    {company.company}
                  </p>

                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${company.eligibilityPercentage}%`,
                      }}
                    ></div>
                  </div>

                  <p>
                    {company.eligibilityPercentage}%
                    Match
                  </p>
                </div>
              )
            )}
          </div>
        )}

      <CompanyGroup
        title="Eligible Companies"
        companies={
          result.eligibleCompanies
        }
        emptyText="No companies are fully eligible yet."
      />

      <CompanyGroup
        title="Not Eligible Companies"
        companies={
          result.notEligibleCompanies
        }
        emptyText="Great work. No rejection gaps found."
      />
    </section>
  );
}

function CompanyGroup({ title, companies, emptyText }) {
  return (
    <div className="company-group">
      <h2>{title}</h2>

      {companies.length === 0 ? (
        <p className="empty-result">{emptyText}</p>
      ) : (
        <div className="company-card-grid">
          {companies.map((company) => (
            <CompanyCard key={company.company} company={company} />
          ))}
        </div>
      )}
    </div>
  );
}

function CompanyCard({ company }) {
  return (
    <article className={`company-card ${company.status}`}>
      <div className="company-card-header">
        <div>
          <h3>{company.company}</h3>
          <p>{formatStatus(company.status)}</p>
        </div>
        <strong>{company.eligibilityPercentage}%</strong>
      </div>

      {company.reasons.length > 0 ? (
        <>
          <h4>Reasons</h4>
          <ul>
            {company.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </>
      ) : (
        <p className="positive-text">All eligibility requirements are met.</p>
      )}

      <h4>Required Skills</h4>
      <div className="company-skill-list">
        {company.rules.requiredSkills.map((skill) => (
          <span
            key={skill}
            className={company.missingSkills.includes(skill) ? "missing" : "matched"}
          >
            {skill}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatStatus(status) {
  if (status === "eligible") {
    return "Eligible";
  }

  if (status === "needs_improvement") {
    return "Needs Improvement";
  }

  return "Not Eligible";
}

function safeParseProfile() {
  try {
    return JSON.parse(localStorage.getItem("profile")) || {};
  } catch {
    return {};
  }
}

export default Eligibility;
