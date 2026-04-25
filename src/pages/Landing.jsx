import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/pages/landing.css";

function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate("/login");
  };

  const handleLearnMore = () => {
    document.getElementById("why-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      {/* Navigation Bar */}
      <nav className="landing-nav">
        <div className="landing-nav-container">
          <div className="landing-logo">
            <span className="landing-logo-icon">◆</span>
            OSCT
          </div>
          <div className="landing-nav-links">
            <a href="#why">Why</a>
            <a href="#path">Path</a>
            <a href="#start">Start</a>
          </div>
          <button className="landing-nav-btn" onClick={handleGetStarted}>
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-background">
          <div className="landing-hero-gradient"></div>
          <div className="landing-hero-blob landing-hero-blob-1" style={{ transform: `translateY(${scrollY * 0.5}px)` }}></div>
          <div className="landing-hero-blob landing-hero-blob-2" style={{ transform: `translateY(${scrollY * 0.3}px)` }}></div>
        </div>
        <div className="landing-hero-content">
          <span className="landing-hero-label">✨ EXPLORE OPEN SOURCE</span>
          <h1 className="landing-hero-title">
            Start Your Open Source<br />
            <span className="landing-hero-highlight">Journey With Confidence</span>
          </h1>
          <p className="landing-hero-description">
            Open source can feel intimidating at first. We're here to guide you through it all. Learn the essentials, find the right projects, and make your first contribution with our step-by-step guidance.
          </p>
          <div className="landing-hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started →
            </button>
            <button className="btn-secondary" onClick={handleLearnMore}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Why Open Source Section */}
      <section id="why-section" className="landing-why">
        <div className="landing-why-container">
          <div className="landing-why-header">
            <h2 className="landing-section-title">
              Why Open Source<br />
              <span className="landing-section-highlight">Matters</span>
            </h2>
            <p className="landing-why-subtitle">Discover the benefits of contributing to open source projects</p>
          </div>

          <div className="landing-why-grid">
            {/* Skill Development */}
            <div className="landing-why-card landing-why-card-1">
              <div className="landing-why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                </svg>
              </div>
              <h3>Build real-world experience</h3>
              <p>Work on actual projects used by thousands. Gain practical skills that matter in the real world.</p>
            </div>

            {/* Improve Skills */}
            <div className="landing-why-card landing-why-card-2">
              <div className="landing-why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                  <polyline points="13 2 13 9 20 9" />
                </svg>
              </div>
              <h3>Improve coding skills</h3>
              <p>Learn from experienced developers. Get code reviews and feedback to level up your abilities.</p>
            </div>

            {/* Strengthen Resume */}
            <div className="landing-why-card landing-why-card-3">
              <div className="landing-why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Strengthen resume</h3>
              <p>Show employers real contributions. Demonstrate your ability to work in collaborative environments.</p>
            </div>

            {/* Connect Worldwide */}
            <div className="landing-why-card landing-why-card-4">
              <div className="landing-why-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3>Connect worldwide</h3>
              <p>Join a global community of developers. Network with people from around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="landing-impact">
        <div className="landing-impact-container">
          <div className="landing-impact-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
          </div>
          <h2 className="landing-impact-title">Your code can help thousands.</h2>
          <p className="landing-impact-description">
            Every contribution matters. Whether it's fixing a bug, adding a feature, or improving documentation, your work can make a real difference in the lives of developers around the world.
          </p>
        </div>
      </section>

      {/* The Curator's Path Section */}
      <section id="path" className="landing-path">
        <div className="landing-path-container">
          <h2 className="landing-section-title">The Curator's Path</h2>
          <p className="landing-path-subtitle">
            We've designed a structured journey to take you from beginner to confident contributor.
          </p>

          <div className="landing-path-grid">
            {/* Learn */}
            <div className="landing-path-card landing-path-card-1">
              <div className="landing-path-number">1</div>
              <h3>Learn</h3>
              <p>Start with the basics. Understand how open source works, the tools you'll need, and best practices.</p>
              <div className="landing-path-arrow">→</div>
            </div>

            {/* Discover */}
            <div className="landing-path-card landing-path-card-2">
              <div className="landing-path-number">2</div>
              <h3>Discover</h3>
              <p>Explore repositories that match your interests and skill level. Find projects you're passionate about.</p>
              <div className="landing-path-arrow">→</div>
            </div>

            {/* Start */}
            <div className="landing-path-card landing-path-card-3">
              <div className="landing-path-number">3</div>
              <h3>Start</h3>
              <p>Make your first contribution. We'll guide you through every step of the process.</p>
              <div className="landing-path-arrow">→</div>
            </div>

            {/* Grow */}
            <div className="landing-path-card landing-path-card-4">
              <div className="landing-path-number">4</div>
              <h3>Grow</h3>
              <p>Keep contributing and learning. Build your portfolio and become part of the community.</p>
            </div>
          </div>

          <p className="landing-path-quote">
            "You do not need to be an expert to start. Every senior engineer started exactly where you are right now."
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section id="start" className="landing-cta">
        <div className="landing-cta-container">
          <h2 className="landing-cta-title">Your first contribution can start today.</h2>
          <p className="landing-cta-subtitle">Join thousands of developers making a difference in open source.</p>
          <div className="landing-cta-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started Now
            </button>
            <a href="/signup" className="landing-cta-link">Already have an account? Sign in</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-container">
          <div className="landing-footer-content">
            <p>&copy; 2024 OSCT. All rights reserved.</p>
          </div>
          <div className="landing-footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
