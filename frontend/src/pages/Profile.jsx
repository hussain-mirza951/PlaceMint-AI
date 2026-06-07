import "../App.css";
import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    branch: "",
    cgpa: "",
    company: "",
    year: "",
  });

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
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="branch"
          placeholder="Branch"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="cgpa"
          placeholder="CGPA"
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="company"
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