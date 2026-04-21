import { useNavigate } from "react-router-dom";

// Mock issues data - beginner-friendly explanations
const mockIssues = [
  {
    id: 1,
    title: "Fix typo in README",
    repoName: "facebook/react",
    explanation: "The README file has a spelling mistake in the installation instructions. Fixing it helps new users follow the steps correctly.",
    whyBeginnerFriendly: "This is great for beginners because you only need to change a few words. There's no code to worry about, and you can see your fix right away.",
    difficulty: "Very Easy",
    labels: ["documentation", "good first issue"],
  },
  {
    id: 2,
    title: "Add example to documentation",
    repoName: "expressjs/express",
    explanation: "The Express.js documentation shows how to create a basic server, but it doesn't show how to handle different URL paths.",
    whyBeginnerFriendly: "This helps you practice reading documentation and adding clear examples. You can use the existing examples as a guide.",
    difficulty: "Easy",
    labels: ["documentation", "enhancement"],
  },
  {
    id: 3,
    title: "Fix console warning in tests",
    repoName: "microsoft/vscode",
    explanation: "When running tests, there's a warning message that doesn't affect functionality but clutters the output.",
    whyBeginnerFriendly: "This teaches you how tests work in a real project. The fix is usually small and you can compare with similar test files.",
    difficulty: "Easy",
    labels: ["bug", "tests"],
  },
  {
    id: 4,
    title: "Update error message for clarity",
    repoName: "python/cpython",
    explanation: "When users make a certain mistake, the error message is confusing and doesn't tell them how to fix it.",
    whyBeginnerFriendly: "This is about writing clear messages for humans. You'll learn how error handling works without changing complex logic.",
    difficulty: "Easy",
    labels: ["bug", "beginner"],
  },
  {
    id: 5,
    title: "Add missing comma in data file",
    repoName: "twbs/bootstrap",
    explanation: "A data file used for generating CSS has a syntax error that causes a build warning.",
    whyBeginnerFriendly: "This is a simple fix that teaches you about data formats. You can easily see what's wrong and verify your fix.",
    difficulty: "Very Easy",
    labels: ["bug", "good first issue"],
  },
];

function IssueCard({ issue, onSelect }) {
  return (
    <div className="card" style={{ cursor: 'pointer' }}>
      {/* Issue header */}
      <div style={{ marginBottom: 'var(--spacing-md)' }}>
        <h3 className="repository-name" style={{ margin: 0, marginBottom: 'var(--spacing-xs)' }}>{issue.title}</h3>
        <p style={{ fontSize: 'var(--font-size-label-md)', color: 'var(--color-on-surface-variant)', margin: 0 }}>
          {issue.repoName}
        </p>
      </div>

      {/* Explanation */}
      <p className="repository-description" style={{ marginBottom: 'var(--spacing-md)' }}>
        <span style={{ fontWeight: 'var(--font-weight-headline)' }}>What it is: </span>
        {issue.explanation}
      </p>

      {/* Why beginner friendly */}
      <div style={{
        background: 'var(--color-surface-container-low)',
        borderLeft: '4px solid var(--color-success)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-lg)'
      }}>
        <p style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--color-on-surface)', margin: 0 }}>
          <span style={{ fontWeight: 'var(--font-weight-headline)' }}>Why it's good for beginners: </span>
          {issue.whyBeginnerFriendly}
        </p>
      </div>

      {/* Labels */}
      <div className="repository-tags" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <span className="chip" style={{ fontSize: 'var(--font-size-label-sm)' }}>
          {issue.difficulty}
        </span>
        {issue.labels.map((label) => (
          <span
            key={label}
            className="chip"
            style={{ fontSize: 'var(--font-size-label-sm)' }}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="repository-actions">
        <button
          onClick={() => onSelect(issue)}
          className="btn-primary"
          style={{ flex: 1 }}
        >
          Start with this issue
        </button>
        <button
          onClick={() => window.open(`https://github.com/${issue.repoName}/issues/${issue.id}`, "_blank")}
          className="btn-secondary"
          style={{ flex: 1 }}
        >
          View on GitHub
        </button>
      </div>
    </div>
  );
}

function RepoIssues() {
  const navigate = useNavigate();

  const handleSelectIssue = (issue) => {
    // Here you would typically navigate to an issue detail page or start the contribution flow
    console.log("Selected issue:", issue);
    // For now, just show a simple alert
    alert(`You've chosen to work on: "${issue.title}"\n\nThis would start the contribution process for this issue.`);
  };

  return (
    <div className="repositories-page">

      <div className="repositories-container">
        {/* Page header */}
        <div className="repositories-header">
          <h1 className="repositories-title">Choose Your First Issue</h1>
          <p className="repositories-subtitle">
            Pick an issue that matches your current skills. Each one below is labeled as beginner-friendly with clear explanations.
          </p>
        </div>

        {/* Issues count */}
        <p className="text-body-md" style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-on-surface-variant)' }}>
          Showing {mockIssues.length} beginner-friendly issue
          {mockIssues.length !== 1 ? "s" : ""}
        </p>

        {/* Issues list */}
        <div className="repositories-grid" style={{ gridTemplateColumns: '1fr', gap: 'var(--spacing-lg)' }}>
          {mockIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onSelect={handleSelectIssue}
            />
          ))}
        </div>

        {/* Back link */}
        <div style={{ marginTop: 'var(--spacing-2xl)' }}>
          <button
            onClick={() => navigate(-1)}
            className="btn-tertiary"
          >
            ← Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default RepoIssues;
