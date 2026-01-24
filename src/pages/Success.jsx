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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-lg mx-auto">
        {/* Success header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Your pull request is submitted!
          </h1>
          <p className="text-gray-600">
            You did it. Your first contribution to an open source project is out
            there. Take a moment to appreciate that.
          </p>
        </div>

        {/* PR details card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Pull Request Details
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Repository</span>
              <span className="text-gray-800 font-medium">{repoName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Submitted</span>
              <span className="text-gray-800">{prDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-sm">
                {prStatus}
              </span>
            </div>
          </div>
        </div>

        {/* What happens next */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>What happens next?</strong>
            <br />
            Maintainers will review your changes. This can take a few days. If
            they have feedback, you'll get notifications on GitHub. Either way,
            you've already learned something valuable.
          </p>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <Link
            to="/repo-issues"
            className="block w-full px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-center"
          >
            Try another beginner issue
          </Link>
          <Link
            to="/navigator"
            className="block w-full px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-center"
          >
            Go back to navigator
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;

