import "../App.css";
import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "",
          email: "",
          phone: "",
          branch: "",
          cgpa: "",
          company: "",
          year: "",
          linkedin: "",
          github: "",
          skills: "",
          projects: "",
          internships: "",
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );
  }, [profile]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const cgpa = Number(profile.cgpa) || 0;

  const companyReadiness = {
    Google: Math.min(100, Math.round(cgpa * 7 + 20)),
    Amazon: Math.min(100, Math.round(cgpa * 8 + 15)),
    Microsoft: Math.min(100, Math.round(cgpa * 7.5 + 18)),
    Infosys: Math.min(100, Math.round(cgpa * 9)),
    TCS: Math.min(100, Math.round(cgpa * 9.5)),
  };

  return (
    <div className="dashboard">
      <h1>Student Profile</h1>

      <div className="roadmap-result">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={profile.name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          value={profile.branch}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="cgpa"
          placeholder="CGPA"
          value={profile.cgpa}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="company"
          value={profile.company}
          onChange={handleChange}
        >
          <option value="">Select Company</option>
          <option value="Google">Google</option>
          <option value="Amazon">Amazon</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Infosys">Infosys</option>
          <option value="TCS">TCS</option>
        </select>

        <br /><br />

        <input
          type="text"
          name="year"
          placeholder="Graduation Year"
          value={profile.year}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={profile.linkedin}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={profile.github}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="skills"
          placeholder="Python, Java, SQL, React"
          value={profile.skills}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="projects"
          placeholder="Projects Completed"
          value={profile.projects}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="internships"
          placeholder="Internships Completed"
          value={profile.internships}
          onChange={handleChange}
        />
      </div>

      <div className="roadmap-result">
        <h2>Profile Preview</h2>

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Branch:</strong> {profile.branch}</p>
        <p><strong>CGPA:</strong> {profile.cgpa}</p>
        <p><strong>Target Company:</strong> {profile.company}</p>
        <p><strong>Graduation Year:</strong> {profile.year}</p>
        <p><strong>LinkedIn:</strong> {profile.linkedin}</p>
        <p><strong>GitHub:</strong> {profile.github}</p>
        <p><strong>Skills:</strong> {profile.skills}</p>
        <p><strong>Projects:</strong> {profile.projects}</p>
        <p><strong>Internships:</strong> {profile.internships}</p>
      </div>

      <div className="roadmap-result">
        <h2>Company Readiness</h2>

        {Object.entries(companyReadiness).map(
          ([company, score]) => (
            <div key={company}>
              <p>
                <strong>{company}</strong> - {score}%
              </p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{
                    width: `${score}%`,
                  }}
                ></div>
              </div>

              <br />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Profile;