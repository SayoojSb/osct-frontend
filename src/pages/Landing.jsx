import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="auth-page">
      <div className="auth-container" style={{ maxWidth: '500px' }}>
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <h1 className="auth-title" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Welcome to OSCT
          </h1>
          
          <p className="auth-subtitle" style={{ marginBottom: 'var(--spacing-2xl)' }}>
            A friendly space to learn and grow at your own pace. 
            No pressure, just helpful tools to support your journey.
          </p>
          
          <Link
            to="/login"
            className="btn-primary"
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              textDecoration: 'none'
            }}
          >
            Start learning
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
