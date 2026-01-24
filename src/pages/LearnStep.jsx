import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Step configuration : 
const stepsData = {
  fork: {
    number: 1,
    title: "Fork the repository",
    what: "A fork is your personal copy of someone else's repository. When you fork a repo, you're creating your own version of it on GitHub that you can freely modify without affecting the original project.",
    why: "Forking lets you experiment with changes safely. It's how open source projects accept contributions - you work on your fork, then propose your changes back to the original repo through a pull request.",
    how: "You know the fork worked when you see 'forked from' under the repo name on GitHub, and you have your own copy you can edit.",
    mistakes: [
      "Trying to edit the original repo directly (you need a fork for that)",
      "Forking from your own repository (you just clone those)",
      "Not finding your fork later (check your GitHub profile's repos tab)",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "You see 'forked from original-owner/repo-name' under the repo name",
        "The repository disappears from GitHub",
        "The files are automatically downloaded to your computer",
      ],
      correctIndex: 0,
    },
  },
  clone: {
    number: 2,
    title: "Clone locally",
    what: "Cloning downloads the repository from GitHub to your computer. This creates a local copy you can work with using your code editor and terminal.",
    why: "You need a local copy because you'll be making changes to the code. Working locally is faster and gives you access to all your development tools.",
    how: "You know it worked when you can see the project files in your folder and run commands like `ls` or `dir` to list them.",
    mistakes: [
      "Cloning into the wrong folder (check where you ran the command)",
      "Using the original repo's URL instead of your fork's URL",
      "Not having Git installed on your computer",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "You receive an email confirmation from GitHub",
        "The project files appear in the folder where you ran the clone command",
        "GitHub automatically deletes the online repository",
      ],
      correctIndex: 1,
    },
  },
  branch: {
    number: 3,
    title: "Create a branch",
    what: "A branch is like a parallel version of the repository. It lets you work on changes without affecting the main code that everyone else uses.",
    why: "Branching keeps your changes organized and isolated. When you submit a pull request, you're asking to merge your branch into the main project.",
    how: "You know it worked when `git branch` shows your new branch name with an asterisk (*), or when you see it listed in the branches dropdown on GitHub.",
    mistakes: [
      "Making changes on the main branch instead of a feature branch",
      "Forgetting to switch to your new branch before making changes",
      "Creating a branch but continuing to edit files in the main branch",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "You receive a confirmation email from GitHub",
        "`git branch` shows your new branch name as the current branch",
        "The main branch files are deleted from your computer",
      ],
      correctIndex: 1,
    },
  },
  changes: {
    number: 4,
    title: "Make changes",
    what: "This is where you actually edit the code or files. You open the project in your code editor and make whatever changes the issue or task requires.",
    why: "Changes are the whole point of contributing - you're improving the project by adding features, fixing bugs, or updating documentation.",
    how: "You know it worked when you can see your modifications in your code editor, and running `git status` shows the files you changed.",
    mistakes: [
      "Editing the wrong files or the wrong parts of files",
      "Making too many changes at once (it's harder to review)",
      "Not testing your changes before moving on",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "Git sends you a notification",
        "Your code editor shows the changes, and `git status` lists modified files",
        "The files are automatically committed and pushed",
      ],
      correctIndex: 1,
    },
  },
  commit: {
    number: 5,
    title: "Commit changes",
    what: "A commit saves your changes to your local git history. Think of it like saving a checkpoint in a game - it records what you changed and when.",
    why: "Commits create a traceable history of your work. They help you and others understand what changed and why. Good commits make collaboration easier.",
    how: "You know it worked when git shows your commit with a message, and `git log` lists your new commit in the history.",
    mistakes: [
      "Writing vague commit messages like 'fixed stuff'",
      "Committing too many unrelated changes at once",
      "Forgetting to stage files before committing",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "The files are automatically uploaded to GitHub",
        "`git log` shows your new commit with your message",
        "Your code editor closes and reopens",
      ],
      correctIndex: 1,
    },
  },
  pr: {
    number: 6,
    title: "Open a Pull Request",
    what: "A pull request (PR) is a proposal to merge your changes from your fork into the original repository. It's how you formally ask the project maintainers to review and accept your contributions.",
    why: "PRs enable collaboration on open source projects. They let maintainers review your work, give feedback, and decide whether to merge your changes.",
    how: "You know it worked when you see your PR created on GitHub with a number like '#1', showing your changes and a space for review discussion.",
    mistakes: [
      "Not describing what your PR does in the description",
      "Submitting a PR with broken code or failing tests",
      "Not responding to reviewer feedback",
    ],
    question: {
      text: "What tells you this step worked?",
      options: [
        "You receive a confirmation email",
        "Your PR appears on the original repo's pull requests page with a number",
        "Your changes are automatically merged into the main branch",
      ],
      correctIndex: 1,
    },
  },
};

function LearnStep() {
  const { stepId } = useParams();
  const step = stepsData[stepId];

  // states for interactivity :
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [reflection, setReflection] = useState("");

  // Redirect to learn overview if step doesn't exist :
  if (!step) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Step not found
          </h2>
          <Link
            to="/learn"
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Back to overview
          </Link>
        </div>
      </div>
    );
  }

  // Getting all steps for the sidebar checklist :
  const allSteps = Object.entries(stepsData).map(([id, data]) => ({
    id,
    ...data,
  }));

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const handleComplete = () => {
    // find next step :
    const currentIndex = allSteps.findIndex((s) => s.id === stepId);
    const nextStep = allSteps[currentIndex + 1];

    if (nextStep) {
      window.location.href = `/learn/${nextStep.id}`;
    } else {
      // If all steps are completed - redirect to overview :
      window.location.href = "/learn";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="flex gap-8">
          {/* Left sidebar for Step checklist : */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sticky top-6">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
                PR Steps
              </h3>
              <nav className="space-y-1">
                {allSteps.map((s) => (
                  <Link
                    key={s.id}
                    to={`/learn/${s.id}`}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                      s.id === stepId
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span
                      className={`flex items-center justify-center w-6 h-6 text-xs rounded-full ${
                        s.id === stepId
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {s.number}
                    </span>
                    <span className="truncate">{s.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <div className="flex-1">

            <div className="mb-8">
              <span className="text-sm text-gray-500">Step {step.number} of 6</span>
              <h1 className="text-2xl font-semibold text-gray-800 mt-1">
                {step.title}
              </h1>
            </div>

            {/* what section */}
            <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                What you are doing
              </h2>
              <p className="text-gray-600 leading-relaxed">{step.what}</p>
            </section>

            {/* why section */}
            <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                Why this step exists
              </h2>
              <p className="text-gray-600 leading-relaxed">{step.why}</p>
            </section>

            {/* how section */}
            <section className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-3">
                How to know it worked
              </h2>
              <p className="text-gray-600 leading-relaxed">{step.how}</p>
            </section>

            {/* question section */}
            <section className="mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-4">
                  {step.question.text}
                </h2>
                <div className="space-y-3">
                  {step.question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? index === step.question.correctIndex
                            ? "border-green-500 bg-green-50 text-green-800"
                            : "border-red-500 bg-red-50 text-red-800"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
                {showFeedback && (
                  <div
                    className={`mt-4 p-4 rounded-lg ${
                      selectedAnswer === step.question.correctIndex
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedAnswer === step.question.correctIndex
                      ? "✓ That's correct!"
                      : "✗ Not quite. Try again!"}
                  </div>
                )}
              </div>
            </section>

            {/* Troubleshooting collapsible section */}
            <section className="mb-8">
              <button
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="flex items-center justify-between w-full px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <span className="font-medium">😰 Something went wrong?</span>
                <span
                  className={`transform transition-transform ${
                    showTroubleshooting ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>
              {showTroubleshooting && (
                <div className="mt-2 p-4 bg-white border border-amber-200 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Common beginner mistakes:
                  </h3>
                  <ul className="space-y-2">
                    {step.mistakes.map((mistake, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-600"
                      >
                        <span className="text-amber-500 mt-1">•</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {/* Reflection question */}
            <section className="mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h2 className="text-lg font-medium text-gray-800 mb-3">
                  Why do we do this step?
                </h2>
                <p className="text-sm text-gray-500 mb-3">
                  Take a moment to think about it. There's no wrong answer.
                </p>
                <textarea
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                  placeholder="Write your thoughts here..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            </section>

            {/* Complete button */}
            <button
              onClick={handleComplete}
              className="w-full py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Mark step complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnStep;

