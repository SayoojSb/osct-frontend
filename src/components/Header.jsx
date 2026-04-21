import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/header.css";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user info from localStorage or API
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Right Section */}
        <div className="header-right">
          {/* Notification Icon */}
          <button className="header-icon-btn" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          {/* Grid Icon */}
          <button className="header-icon-btn" aria-label="Apps">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
          </button>

          {/* User Profile */}
          <div className="header-profile">
            <button className="profile-btn" onClick={handleLogout}>
              <div className="profile-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="profile-info">
                <div className="profile-name">{user?.name || "User"}</div>
                <div className="profile-role">CURATOR</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
