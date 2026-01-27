import { useState, useEffect } from "react";
import GithubService from "../services/github.service";

// Heuristic to calculate a safety score based on repo stats
function calculateSafetyScore(repo) {
  let score = 50; // Base score

  // 1. Popularity (Stars): +10 per 1k stars (max 30)
  const starsScore = Math.min((repo.stars / 1000) * 10, 30);
  score += starsScore;

  // 2. Recency (Last Updated)
  const daysSinceUpdate = (new Date() - new Date(repo.updatedAt)) / (1000 * 60 * 60 * 24);
  if (daysSinceUpdate <= 30) score += 20;
  else if (daysSinceUpdate <= 90) score += 10;

  // 3. Issues: -1 per 100 open issues (max -20)
  const issuesPenalty = Math.min((repo.openIssues / 100) * 1, 20);
  score -= issuesPenalty;

  // 4. Description bonus
  if (repo.description && repo.description.length > 10) score += 5;

  // Clamp between 0-100
  return Math.max(0, Math.min(Math.round(score), 100));
}

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
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-gray-800 hover:text-blue-600 hover:underline"
          >
            {repo.name}
          </a>
          <p className="text-sm text-gray-500">{repo.fullName}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium border ${getSafetyScoreColor(
            repo.safetyScore
          )}`}
        >
          Safety: {repo.safetyScore}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4">
        {repo.description || "No description provided."}
      </p>

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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{formatNumber(repo.openIssues)}</span>
        </div>

        {/* Language */}
        {repo.language && (
          <div className="flex items-center gap-1">
            <span
              className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}
            ></span>
            <span>{repo.language}</span>
          </div>
        )}

        {/* Last updated */}
        <div className="ml-auto text-gray-400">
          Updated {formatLastUpdated(repo.updatedAt)}
        </div>
      </div>
    </div>
  );
}

function OrgRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters and Pagination
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 10;

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        // Map UI sort options to API params
        const sort = sortBy === "recent" ? "updated" : "stars";
        const order = "desc";

        const data = await GithubService.searchRepositories({
          q: "stars:>1", // Default query to get diverse results
          language: languageFilter || undefined,
          sort,
          order,
          page,
          perPage: PER_PAGE,
        });

        // Adapt backend data to UI shape and calculate safety score
        const adaptedRepos = data.repos.map((repo) => ({
          ...repo,
          safetyScore: calculateSafetyScore(repo),
        }));

        setRepos(adaptedRepos);

        // Calculate total pages (Github search API cap is usually 1000 results or restricted)
        // We'll trust the API's total but cap UI if needed, for now just use what's returned
        setTotalPages(Math.ceil(data.meta.total / PER_PAGE));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch repositories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [languageFilter, sortBy, page]);

  // Handler to reset page when filters change
  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1); // Reset to first page
  };

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
                onChange={(e) => handleFilterChange(setLanguageFilter, e.target.value)}
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
                onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
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

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            {/* Results count */}
            <p className="text-sm text-gray-600 mb-4">
              Showing {repos.length} repositor{repos.length !== 1 ? "ies" : "y"}
            </p>

            {/* Repository list */}
            <div className="space-y-4">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {/* Empty state */}
            {repos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No repositories found for the selected filter.
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {repos.length > 0 && (
              <div className="flex justify-between items-center mt-8">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${page === 1
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  Previous
                </button>
                <div className="text-sm text-gray-600">
                  Page {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!repos.length} // Simplified check, could check totalPages
                  className={`px-4 py-2 rounded-lg border text-sm font-medium ${!repos.length
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default OrgRepos;

