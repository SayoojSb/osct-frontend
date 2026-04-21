import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/pages/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [recentActivity, setRecentActivity] = useState([]);
  const [learningStreak, setLearningStreak] = useState(12);

  useEffect(() => {
    // Fetch recent activity from API
    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contributions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setRecentActivity(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch recent activity:", error);
      }
    };

    fetchActivity();
  }, []);

  const cards = [
    {
      title: "Explore Repositories",
      description: "Discover verified projects with a high Safety Score to ensure a smooth onboarding experience.",
      icon: "folder",
      buttonText: "BROWSE GALLERY",
      onClick: () => navigate("/org-repos"),
    },
    {
      title: "Start with Easy Issues",
      description: "Filter through tasks specifically tagged with 'good first issue' curated by our mentors.",
      icon: "star",
      buttonText: "VIEW ISSUES",
      onClick: () => navigate("/repo-issues"),
    },
  ];

  return (
    <div className="dashboard">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">RECOMMENDED FOR BEGINNERS</div>
        <h1 className="hero-title">
          Learn How to Make<br />
          <span className="hero-title-highlight">Your First PR</span>
        </h1>
        <p className="hero-description">
          Master the art of open-source contribution with our guided interactive workshop designed for new curators.
        </p>
        <button className="btn-primary hero-button" onClick={() => navigate("/learn")}>
          START LEARNING
        </button>
      </section>

      {/* Main Content Grid */}
      <div className="dashboard-main">
        {/* Left Column - Cards and Activity */}
        <div className="dashboard-left">
          {/* Cards Grid */}
          <div className="cards-grid">
            {cards.map((card, index) => (
              <div key={index} className="card dashboard-card">
                <div className="card-icon">
                  {card.icon === "folder" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                    </svg>
                  )}
                  {card.icon === "star" && (
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  )}
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <button className="btn-secondary card-button" onClick={card.onClick}>
                  {card.buttonText}
                </button>
              </div>
            ))}

            {/* Track Your Contributions Card */}
            <div className="card dashboard-card track-card">
              <h3 className="card-title">Track Your Contributions</h3>
              <p className="card-description">
                You have 3 active pending reviews this week. Keep up the momentum.
              </p>
              <div className="card-actions">
                <button className="btn-primary" onClick={() => navigate("/add")}>
                  ADD A PR
                </button>
                <button className="btn-secondary" onClick={() => navigate("/contributions")}>
                  VIEW MY CONTRIBUTIONS
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <section className="activity-section">
            <div className="activity-header">
              <h2 className="activity-title">Recent Activity</h2>
              <a href="#" className="activity-link">VIEW HISTORY</a>
            </div>
            <div className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        Completed module: "{activity.title || 'Git Branching Basics'}"
                      </p>
                      <p className="activity-time">
                        {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString() : '2 hours ago'} • Part of Open Source Foundations
                      </p>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-badge">+58 XP</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="activity-empty">
                  <p>No recent activity yet. Start your journey!</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column - Streak and Stats */}
        <aside className="dashboard-right">
          {/* Learning Streak Card */}
          <div className="card streak-card">
            <h3 className="streak-title">LEARNING STREAK</h3>
            <div className="streak-content">
              <div className="streak-number">{learningStreak}</div>
              <div className="streak-label">Days</div>
            </div>
            <p className="streak-description">
              Keep the momentum going! You're on a great learning streak.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Dashboard;
