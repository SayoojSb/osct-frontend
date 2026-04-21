function Execute() {
  const handleOpenGitHub = () => {
    window.open("https://github.com", "_blank", "noopener,noreferrer");
  };

  const steps = [
    { text: "Fork the repository", done: true },
    { text: "Create a new branch", done: true },
    { text: "Commit your changes", done: true },
    { text: "Open a pull request", done: true },
  ];

  return (
    <div className="repositories-page">

      <div className="repositories-container" style={{ maxWidth: '600px' }}>
        {/* Reassurance message */}
        <div style={{ marginBottom: 'var(--spacing-2xl)', textAlign: 'center' }}>
          <h1 className="repositories-title" style={{ marginBottom: 'var(--spacing-md)' }}>
            You're almost there
          </h1>
          <p className="repositories-subtitle">
            Opening a PR can feel intimidating, but you've done the hard work.
            This is just the final step.
          </p>
        </div>

        {/* Checklist card */}
        <div className="card" style={{ marginBottom: 'var(--spacing-lg)' }}>
          <h2 style={{ fontSize: 'var(--font-size-headline-lg)', fontWeight: 'var(--font-weight-headline)', marginBottom: 'var(--spacing-lg)' }}>
            Before you submit
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            {steps.map((step, index) => (
              <li key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-md)' }}>
                <span style={{
                  flexShrink: 0,
                  width: '32px',
                  height: '32px',
                  background: 'var(--color-success)',
                  color: 'var(--color-on-primary)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ✓
                </span>
                <span style={{ color: 'var(--color-on-surface-variant)', fontSize: 'var(--font-size-body-lg)' }}>{step.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub button */}
        <button
          onClick={handleOpenGitHub}
          className="btn-primary"
          style={{
            width: '100%',
            padding: 'var(--spacing-lg)',
            fontSize: 'var(--font-size-headline-sm)'
          }}
        >
          Open on GitHub
        </button>
      </div>
    </div>
  );
}

export default Execute;
