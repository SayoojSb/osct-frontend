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
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors">
      {/* Issue header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{issue.title}</h3>
        <p className="text-sm text-gray-500">{issue.repoName}</p>
      </div>

      {/* Explanation */}
      <p className="text-gray-600 text-sm mb-3">
        <span className="font-medium text-gray-700">What it is: </span>
        {issue.explanation}
      </p>

      {/* Why beginner friendly */}
      <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4">
        <p className="text-green-800 text-sm">
          <span className="font-medium">Why it's good for beginners: </span>
          {issue.whyBeginnerFriendly}
        </p>
      </div>

      {/* Labels */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
          {issue.difficulty}
        </span>
        {issue.labels.map((label) => (
          <span
            key={label}
            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onSelect(issue)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start with this issue
        </button>
        <button
          onClick={() => window.open(`https://github.com/${issue.repoName}/issues/${issue.id}`, "_blank")}
          className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Choose Your First Issue
          </h1>
          <p className="text-gray-600">
            Pick an issue that matches your current skills. Each one below is labeled as beginner-friendly with clear explanations.
          </p>
        </div>

        {/* Issues count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {mockIssues.length} beginner-friendly issue
          {mockIssues.length !== 1 ? "s" : ""}
        </p>

        {/* Issues list */}
        <div className="space-y-4">
          {mockIssues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onSelect={handleSelectIssue}
            />
          ))}
        </div>

        {/* Back link */}
        <div className="mt-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700 underline"
          >
            ← Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default RepoIssues;

