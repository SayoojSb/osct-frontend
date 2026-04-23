import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/pages/profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    pullRequests: 0,
    savedRepositories: 0,
    issuesExplored: 0,
    contributionsAdded: 0,
  });

  useEffect(() => {
    // Get user info from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }

    // Fetch user stats from API
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/contributions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStats({
            pullRequests: data.length || 0,
            savedRepositories: Math.floor(Math.random() * 15) + 5, // Placeholder
            issuesExplored: Math.floor(Math.random() * 30) + 10, // Placeholder
            contributionsAdded: data.length || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="profile-page">
      {/* Header Section */}
      <div className="profile-header">
        <div>
          <h1 className="profile-title">My Profile</h1>
          <p className="profile-subtitle">Manage your presence within the Curator.</p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-content">
          {/* Avatar */}
          <div className="profile-avatar-section">
            <div className="profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="profile-status-indicator"></div>
          </div>

          {/* User Info */}
          <div className="profile-info">
            <h2 className="profile-name">{user?.name || "User"}</h2>
            <p className="profile-username">@{user?.email?.split("@")[0] || "username"}</p>

            {/* Status Badges */}
            <div className="profile-badges">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M12 6v6l4 2" />
                </svg>
                GitHub Connected
              </div>
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Joined October 2023
              </div>
            </div>

            {/* Edit Profile Button */}
            <button className="edit-profile-btn" onClick={handleEditProfile}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="activity-summary">
        <h3 className="activity-title">ACTIVITY SUMMARY</h3>
        <div className="stats-grid">
          {/* Pull Requests */}
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </div>
            <p className="stat-label">Pull Requests</p>
            <p className="stat-value">{stats.pullRequests}</p>
          </div>

          {/* Saved Repositories */}
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
            </div>
            <p className="stat-label">Saved Repositories</p>
            <p className="stat-value">{stats.savedRepositories}</p>
          </div>

          {/* Issues Explored */}
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6m0 0v6" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
            <p className="stat-label">Issues Explored</p>
            <p className="stat-value">{stats.issuesExplored}</p>
          </div>

          {/* Contributions Added */}
          <div className="stat-card">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <p className="stat-label">Contributions Added</p>
            <p className="stat-value">{stats.contributionsAdded}</p>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="profile-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
