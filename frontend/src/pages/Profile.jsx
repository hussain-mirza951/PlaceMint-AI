import "../App.css";
import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          name: "",
          branch: "",
          cgpa: "",
          company: "",
          year: "",
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
        </select>

        <br /><br />

        <input
          type="text"
          name="year"
          placeholder="Graduation Year"
          value={profile.year}
          onChange={handleChange}
        />
      </div>

      <div className="roadmap-result">
        <h2>Profile Preview</h2>

        <p><strong>Name:</strong> {profile.name}</p>
        <p><strong>Branch:</strong> {profile.branch}</p>
        <p><strong>CGPA:</strong> {profile.cgpa}</p>
        <p><strong>Target Company:</strong> {profile.company}</p>
        <p><strong>Graduation Year:</strong> {profile.year}</p>
      </div>
    </div>
  );
}

export default Profile;