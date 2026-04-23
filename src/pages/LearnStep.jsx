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

  // Redirect to learn overview if step doesn't exist :
  if (!step) {
    return (
      <div className="learning-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 className="text-headline-lg" style={{ marginBottom: 'var(--spacing-lg)' }}>
            Step not found
          </h2>
          <Link
            to="/learn"
            className="btn-tertiary"
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
    <div className="learning-page">

      <div className="learning-container" style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>

        {/* Left sidebar for Step checklist : */}
        <div style={{ width: '250px', flexShrink: 0 }}>
          <div className="card" style={{ position: 'sticky', top: 'var(--spacing-xl)' }}>
            <h3 style={{ fontSize: 'var(--font-size-label-lg)', color: 'var(--color-on-surface-variant)', textTransform: 'uppercase', letterSpacing: 'var(--letter-spacing-label)', marginBottom: 'var(--spacing-lg)' }}>
              PR Steps
            </h3>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
              {allSteps.map((s) => (
                <Link
                  key={s.id}
                  to={`/learn/${s.id}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    background: s.id === stepId ? 'var(--color-surface-container-highest)' : 'transparent',
                    color: s.id === stepId ? 'var(--color-primary)' : 'var(--color-on-surface-variant)',
                    fontWeight: s.id === stepId ? 'var(--font-weight-headline)' : 'var(--font-weight-body)'
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      fontSize: 'var(--font-size-label-md)',
                      borderRadius: 'var(--radius-full)',
                      background: s.id === stepId ? 'var(--color-primary)' : 'var(--color-surface-container-highest)',
                      color: s.id === stepId ? 'var(--color-on-primary)' : 'var(--color-on-surface-variant)',
                      fontWeight: 'var(--font-weight-headline)'
                    }}
                  >
                    {s.number}
                  </span>
                  <span style={{ fontSize: 'var(--font-size-body-sm)' }}>{s.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div style={{ flex: 1 }}>

          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <span style={{ fontSize: 'var(--font-size-label-md)', color: 'var(--color-on-surface-variant)' }}>Step {step.number} of 6</span>
            <h1 className="learning-title" style={{ marginTop: 'var(--spacing-sm)' }}>
              {step.title}
            </h1>
          </div>

          {/* what section */}
          <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className="learning-section-title">What you are doing</h2>
            <p className="learning-section-content">{step.what}</p>
          </section>

          {/* why section */}
          <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className="learning-section-title">Why this step exists</h2>
            <p className="learning-section-content">{step.why}</p>
          </section>

          {/* how section */}
          <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2 className="learning-section-title">How to know it worked</h2>
            <p className="learning-section-content">{step.how}</p>
          </section>

          {/* question section */}
          <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <div className="card">
              <h2 className="learning-section-title">{step.question.text}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                {step.question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    style={{
                      textAlign: 'left',
                      padding: 'var(--spacing-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-surface-container)',
                      background: selectedAnswer === index
                        ? (index === step.question.correctIndex
                          ? 'var(--color-surface-container-highest)'
                          : 'var(--color-surface-container-highest)')
                        : 'var(--color-surface-container-low)',
                      color: selectedAnswer === index
                        ? (index === step.question.correctIndex
                          ? 'var(--color-success)'
                          : 'var(--color-error)')
                        : 'var(--color-on-surface)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontSize: 'var(--font-size-body-md)',
                      fontWeight: selectedAnswer === index ? 'var(--font-weight-headline)' : 'var(--font-weight-body)'
                    }}
                  >
                    <span style={{ marginRight: 'var(--spacing-md)' }}>
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div
                  style={{
                    marginTop: 'var(--spacing-lg)',
                    padding: 'var(--spacing-lg)',
                    borderRadius: 'var(--radius-md)',
                    background: selectedAnswer === step.question.correctIndex
                      ? 'var(--color-surface-container-highest)'
                      : 'var(--color-surface-container-highest)',
                    color: selectedAnswer === step.question.correctIndex
                      ? 'var(--color-success)'
                      : 'var(--color-error)',
                    fontWeight: 'var(--font-weight-headline)'
                  }}
                >
                  {selectedAnswer === step.question.correctIndex
                    ? "✓ That's correct!"
                    : "✗ Not quite. Try again!"}
                </div>
              )}
            </div>
          </section>

          {/* Troubleshooting collapsible section */}
          <section style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <button
              onClick={() => setShowTroubleshooting(!showTroubleshooting)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--spacing-lg)',
                background: 'var(--color-surface-container-highest)',
                border: '1px solid var(--color-surface-container)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--color-on-surface)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: 'var(--font-size-body-lg)',
                fontWeight: 'var(--font-weight-headline)'
              }}
            >
              <span>😰 Something went wrong?</span>
              <span
                style={{
                  transform: showTroubleshooting ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s ease'
                }}
              >
                ▼
              </span>
            </button>
            {showTroubleshooting && (
              <div className="card" style={{ marginTop: 'var(--spacing-md)' }}>
                <h3 style={{ fontWeight: 'var(--font-weight-headline)', marginBottom: 'var(--spacing-md)' }}>
                  Common beginner mistakes:
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', listStyle: 'none', padding: 0 }}>
                  {step.mistakes.map((mistake, index) => (
                    <li
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--spacing-md)',
                        color: 'var(--color-on-surface-variant)',
                        fontSize: 'var(--font-size-body-md)'
                      }}
                    >
                      <span style={{ color: 'var(--color-warning)', marginTop: 'var(--spacing-xs)' }}>•</span>
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Complete button */}
          <button
            onClick={handleComplete}
            className="btn-primary"
            style={{ width: '100%', padding: 'var(--spacing-lg)', fontSize: 'var(--font-size-headline-sm)' }}
          >
            Mark step complete
          </button>
        </div>
      </div>
    </div>
  );
}

export default LearnStep;
