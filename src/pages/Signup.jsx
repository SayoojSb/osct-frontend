import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      setMessage(res.data.message);

      // OPTIONAL: auto redirect after signup
      // navigate("/login");

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Join OSCT and start contributing</p>

          <form onSubmit={handleSignup} className="auth-form">
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {message && <p className="form-error">{message}</p>}

            <button
              type="submit"
              className="btn-primary auth-primary-action"
              style={{ marginTop: 'var(--spacing-lg)' }}
            >
              Sign Up
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="auth-footer-link"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
