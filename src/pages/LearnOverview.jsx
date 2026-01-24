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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        <p className="text-gray-600 mb-8">
          You'll complete this in 6 steps
        </p>

        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Pull Request Journey
        </h1>

        {/* Steps : */}
        <div className="space-y-4 mb-10">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200"
            >
              <span className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-medium rounded-full">
                {step.number}
              </span>
              <span className="text-gray-700">{step.title}</span>
            </div>
          ))}
        </div>

        {/* button to navigate to next step */}
        <Link
          to="/learn/fork"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start step 1
        </Link>

        {/* Button to go back to dashboard */}
        <Link
          to="/"
          className="inline-block ml-4 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go back
        </Link>

      </div>
    </div>
  );
}

export default LearnOverview;

