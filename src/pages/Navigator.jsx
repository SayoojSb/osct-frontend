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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto">

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Find Your First Repository
          </h1>
          <p className="text-gray-600">
            Not sure where to start? Tell us a bit about yourself, and we'll
            suggest beginner-friendly repositories that match your skills.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          {/* Language using dropdown */}
          <div className="mb-6">
            <label
              htmlFor="language"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              What language do you prefer?
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Experience using dropdown */}
          <div className="mb-6">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              How many pull requests have you made?
            </label>
            <select
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700"
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
            className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Find safe repositories
          </button>
        </form>

        {/* Mock results using placeholder */}
        {language && experience && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-800 text-sm">
              Repository suggestions will appear here once the backend is
              connected.
            </p>
            <p className="text-blue-600 text-xs mt-1">
              Current selection: {language} • {experience}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navigator;

