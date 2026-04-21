import { Link } from "react-router-dom";

function LearnOverview() {
  const steps = [
    { number: 1, title: "Fork repository" },
    { number: 2, title: "Clone locally" },
    { number: 3, title: "Create a branch" },
    { number: 4, title: "Make changes" },
    { number: 5, title: "Commit changes" },
    { number: 6, title: "Open a Pull Request" },
  ];

  return (
    <div className="learning-page">
      <div className="learning-container">
        <div className="learning-header">
          <h1 className="learning-title">Pull Request Journey</h1>
          <p className="learning-subtitle">You'll complete this in 6 steps</p>
        </div>

        {/* Steps */}
        <div className="learning-overview-grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--spacing-md)' }}>
          {steps.map((step) => (
            <div
              key={step.number}
              className="learning-list-item"
              style={{ borderLeft: '4px solid var(--color-primary)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}
            >
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))',
                color: 'var(--color-on-primary)',
                fontSize: 'var(--font-size-headline-sm)',
                fontWeight: 'var(--font-weight-headline)',
                borderRadius: 'var(--radius-full)',
                flexShrink: 0
              }}>
                {step.number}
              </span>
              <span className="learning-list-item-title" style={{ margin: 0 }}>{step.title}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="learning-actions" style={{ marginTop: 'var(--spacing-3xl)' }}>
          <Link
            to="/learn/fork"
            className="btn-primary"
            style={{ padding: '12px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Start Step 1
          </Link>

          <Link
            to="/dashboard"
            className="btn-secondary"
            style={{ padding: '12px 16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LearnOverview;
