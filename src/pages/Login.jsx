import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // preserving frontend origin across github oauth:
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const frontendOrigin = window.location.origin;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Login</h2>
          <p className="auth-subtitle">Welcome back to OSCT</p>

          <form onSubmit={handleLogin} className="auth-form">
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
              />
            </div>

            {message && <p className="form-error">{message}</p>}

            <div className="auth-actions">
              <button
                type="submit"
                className="btn-primary auth-primary-action"
              >
                Login
              </button>

              <div className="auth-divider">
                <span className="auth-divider-text">or</span>
              </div>

              <button
                type="button"
                onClick={() => window.location.href = `${backendUrl}/api/auth/github?redirect_uri=${frontendOrigin}`}
                className="btn-secondary auth-secondary-action"
              >
                Login with GitHub
              </button>
            </div>
          </form>

          <div className="auth-footer">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="auth-footer-link"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
