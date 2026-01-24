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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        {/* Reassurance message */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            You're almost there
          </h1>
          <p className="text-gray-600">
            Opening a PR can feel intimidating, but you've done the hard work.
            This is just the final step.
          </p>
        </div>

        {/* Checklist card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-4">
            Before you submit
          </h2>
          <ul className="space-y-3">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm">
                  ✓
                </span>
                <span className="text-gray-600">{step.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* GitHub button */}
        <button
          onClick={handleOpenGitHub}
          className="w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
        >
          Open on GitHub
        </button>
      </div>
    </div>
  );
}

export default Execute;

