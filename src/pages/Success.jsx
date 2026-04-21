import { Link } from "react-router-dom";

function Success() {
  // Mock data - in real app, this would come from props or state
  const repoName = "facebook/react";
  const prDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const prStatus = "Under Review";

  return (
    <div className="repositories-page">

      <div className="repositories-container" style={{ maxWidth: '600px' }}>
        {/* Success header */}
        <div style={{ marginBottom: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'var(--color-success)',
            color: 'var(--color-on-primary)',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--spacing-lg)',
            fontSize: '40px'
          }}>
            ✓
          </div>
          <h1 className="repositories-title" style={{ marginBottom: 'var(--spacing-md)' }}>
            Your pull request is submitted!
          </h1>
          <p className="repositories-subtitle">
            You did it. Your first contribution to an open source project is out
            there. Take a moment to appreciate that.
          </p>
        </div>

        {/* PR details card */}
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: 'var(--font-size-label-lg)', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-label)', marginBottom: 'var(--spacing-md)' }}>
            Pull Request Details
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-on-surface-variant)' }}>Repository</span>
              <span style={{ fontWeight: 'var(--font-weight-headline)' }}>{repoName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-on-surface-variant)' }}>Submitted</span>
              <span>{prDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--color-on-surface-variant)' }}>Status</span>
              <span className="chip" style={{ fontSize: 'var(--font-size-label-sm)' }}>
                {prStatus}
              </span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="card" style={{ background: 'var(--color-surface-container-low)', marginBottom: 'var(--spacing-lg)' }}>
          <p style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--color-on-surface)', margin: 0 }}>
            <strong>What happens next?</strong>
            <br />
            Maintainers will review your changes. This can take a few days. If
            they have feedback, you'll get notifications on GitHub. Either way,
            you've already learned something valuable.
          </p>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <Link
            to="/repo-issues"
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-lg)',
              textDecoration: 'none',
              width: '100%'
            }}
          >
            Try another beginner issue
          </Link>
          <Link
            to="/navigator"
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--spacing-lg)',
              textDecoration: 'none',
              width: '100%'
            }}
          >
            Go back to navigator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
