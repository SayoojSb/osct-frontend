import { useState, useMemo } from "react";

// Mock repository data
const mockRepos = [
  {
    id: 1,
    name: "react",
    fullName: "facebook/react",
    stars: 215000,
    openIssues: 342,
    lastUpdated: "2024-01-15T10:30:00Z",
    language: "JavaScript",
    safetyScore: 85,
    description: "A library for building user interfaces",
  },
  {
    id: 2,
    name: "tensorflow",
    fullName: "tensorflow/tensorflow",
    stars: 185000,
    openIssues: 1205,
    lastUpdated: "2024-01-14T18:45:00Z",
    language: "Python",
    safetyScore: 72,
    description: "An Open Source Machine Learning Framework",
  },
  {
    id: 3,
    name: "vscode",
    fullName: "microsoft/vscode",
    stars: 148000,
    openIssues: 4521,
    lastUpdated: "2024-01-15T09:15:00Z",
    language: "TypeScript",
    safetyScore: 68,
    description: "Code editing. Redefined.",
  },
  {
    id: 4,
    name: "rust",
    fullName: "rust-lang/rust",
    stars: 98000,
    openIssues: 567,
    lastUpdated: "2024-01-15T11:00:00Z",
    language: "Rust",
    safetyScore: 90,
    description: "A language empowering everyone to build reliable and efficient software",
  },
  {
    id: 5,
    name: "go",
    fullName: "golang/go",
    stars: 115000,
    openIssues: 234,
    lastUpdated: "2024-01-14T22:30:00Z",
    language: "Go",
    safetyScore: 88,
    description: "The Go programming language",
  },
  {
    id: 6,
    name: "bootstrap",
    fullName: "twbs/bootstrap",
    stars: 165000,
    openIssues: 312,
    lastUpdated: "2024-01-13T14:20:00Z",
    language: "CSS",
    safetyScore: 75,
    description: "The most popular HTML, CSS, and JS library in the world",
  },
  {
    id: 7,
    name: "python-guide",
    fullName: "realpython/python-guide",
    stars: 32000,
    openIssues: 45,
    lastUpdated: "2024-01-10T08:00:00Z",
    language: "Python",
    safetyScore: 95,
    description: "Python best practices guidebook",
  },
  {
    id: 8,
    name: "express",
    fullName: "expressjs/express",
    stars: 61000,
    openIssues: 189,
    lastUpdated: "2024-01-12T16:45:00Z",
    language: "JavaScript",
    safetyScore: 82,
    description: "Fast, unopinionated, minimalist web framework for Node.js",
  },
];

const languages = [
  { value: "", label: "All Languages" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "Python", label: "Python" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Go", label: "Go" },
  { value: "Rust", label: "Rust" },
  { value: "CSS", label: "CSS" },
];

const sortOptions = [
  { value: "stars", label: "Most Stars" },
  { value: "recent", label: "Recently Updated" },
];

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k";
  }
  return num.toString();
}

function formatLastUpdated(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
}

function getSafetyScoreColor(score) {
  if (score >= 90) {
    return "bg-green-100 text-green-800 border-green-200";
  } else if (score >= 75) {
    return "bg-blue-100 text-blue-800 border-blue-200";
  } else if (score >= 60) {
    return "bg-yellow-100 text-yellow-800 border-yellow-200";
  } else {
    return "bg-red-100 text-red-800 border-red-200";
  }
}

function getLanguageColor(language) {
  const colors = {
    JavaScript: "bg-yellow-100 text-yellow-800",
    Python: "bg-blue-100 text-blue-800",
    TypeScript: "bg-blue-100 text-blue-800",
    Go: "bg-cyan-100 text-cyan-800",
    Rust: "bg-orange-100 text-orange-800",
    CSS: "bg-purple-100 text-purple-800",
  };
  return colors[language] || "bg-gray-100 text-gray-800";
}

function RepoCard({ repo }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors">
      {/* Header with name and safety score */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{repo.name}</h3>
          <p className="text-sm text-gray-500">{repo.fullName}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getSafetyScoreColor(repo.safetyScore)}`}>
          Safety: {repo.safetyScore}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">{repo.description}</p>

      {/* Stats row */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
        {/* Stars */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{formatNumber(repo.stars)}</span>
        </div>

        {/* Open issues */}
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{formatNumber(repo.openIssues)}</span>
        </div>

        {/* Language */}
        <div className="flex items-center gap-1">
          <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
          <span>{repo.language}</span>
        </div>

        {/* Last updated */}
        <div className="ml-auto text-gray-400">
          Updated {formatLastUpdated(repo.lastUpdated)}
        </div>
      </div>
    </div>
  );
}

function OrgRepos() {
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  const filteredAndSortedRepos = useMemo(() => {
    let repos = [...mockRepos];

    // Filter by language
    if (languageFilter) {
      repos = repos.filter((repo) => repo.language === languageFilter);
    }

    // Sort
    repos.sort((a, b) => {
      if (sortBy === "stars") {
        return b.stars - a.stars;
      } else if (sortBy === "recent") {
        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
      return 0;
    });

    return repos;
  }, [languageFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Organization Repositories
          </h1>
          <p className="text-gray-600">
            Browse repositories and find beginner-friendly projects to contribute to.
          </p>
        </div>

        {/* Filter controls */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Language filter */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="language-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by language
              </label>
              <select
                id="language-filter"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 bg-white"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort dropdown */}
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="sort-by"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Sort by
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-700 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-600 mb-4">
          Showing {filteredAndSortedRepos.length} repository
          {filteredAndSortedRepos.length !== 1 ? "s" : ""}
        </p>

        {/* Repository list */}
        <div className="space-y-4">
          {filteredAndSortedRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Empty state */}
        {filteredAndSortedRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No repositories found for the selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrgRepos;

