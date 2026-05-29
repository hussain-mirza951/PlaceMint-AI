import "../App.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>PlaceMint AI</h1>

        <input
          type="email"
          placeholder="Enter Email"
        />

        <input
          type="password"
          placeholder="Enter Password"
        />

        <Link to="/dashboard">
          <button className="primary-btn">
            Sign In
          </button>
        </Link>

      </div>
    </div>
  );
}

export default Login;