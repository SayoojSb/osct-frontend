import { useState } from "react";

function Navigator() {
  const [language, setLanguage] = useState("");
  const [experience, setExperience] = useState("");

  const languages = [
    { value: "", label: "Select a language" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
    { value: "typescript", label: "TypeScript" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  const experienceLevels = [
    { value: "", label: "Select your experience" },
    { value: "none", label: "None - First contribution" },
    { value: "beginner", label: "1–2 PRs" },
    { value: "intermediate", label: "3+ PRs" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock data - no real API call yet
    console.log("Finding repositories for:", { language, experience });
  };

  return (
    <div className="repositories-page">

      <div className="repositories-container" style={{ maxWidth: '700px' }}>

        <div className="repositories-header">
          <h1 className="repositories-title">Find Your First Repository</h1>
          <p className="repositories-subtitle">
            Not sure where to start? Tell us a bit about yourself, and we'll
            suggest beginner-friendly repositories that match your skills.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card"
        >
          {/* Language using dropdown */}
          <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label
              htmlFor="language"
              className="form-label"
            >
              What language do you prefer?
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Experience using dropdown */}
          <div className="form-group" style={{ marginBottom: 'var(--spacing-lg)' }}>
            <label
              htmlFor="experience"
              className="form-label"
            >
              How many pull requests have you made?
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="form-select"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!language || !experience}
            className="btn-primary"
            style={{
              width: '100%',
              padding: 'var(--spacing-lg)',
              opacity: (!language || !experience) ? 0.5 : 1,
              cursor: (!language || !experience) ? 'not-allowed' : 'pointer'
            }}
          >
            Find safe repositories
          </button>
        </form>

        {/* Mock results using placeholder */}
        {language && experience && (
          <div className="card" style={{ marginTop: 'var(--spacing-lg)', background: 'var(--color-surface-container-low)' }}>
            <p style={{ fontSize: 'var(--font-size-body-md)', color: 'var(--color-on-surface)', margin: 0, marginBottom: 'var(--spacing-sm)' }}>
              Repository suggestions will appear here once the backend is
              connected.
            </p>
            <p style={{ fontSize: 'var(--font-size-label-md)', color: 'var(--color-on-surface-variant)', margin: 0 }}>
              Current selection: {language} • {experience}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigator;
