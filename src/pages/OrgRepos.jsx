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
    return "var(--color-success)";
  } else if (score >= 75) {
    return "var(--color-primary)";
  } else if (score >= 60) {
    return "var(--color-warning)";
  } else {
    return "var(--color-error)";
  }
}

function RepoCard({ repo }) {
  return (
    <div className="repository-card">
      {/* Header with name and safety score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
        <div style={{ flex: 1 }}>
          <a
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="repository-name"
            style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
          >
            {repo.name}
          </a>
          <p style={{ fontSize: 'var(--font-size-label-md)', color: 'var(--color-on-surface-variant)', margin: 'var(--spacing-xs) 0 0 0' }}>
            {repo.fullName}
          </p>
        </div>
        <div
          className="chip"
          style={{
            background: getSafetyScoreColor(repo.safetyScore),
            color: 'var(--color-on-primary)',
            padding: '6px 12px',
            fontSize: 'var(--font-size-label-sm)',
            flexShrink: 0
          }}
        >
          Safety: {repo.safetyScore}
        </div>
      </div>

      {/* Description */}
      <p className="repository-description">
        {repo.description || "No description provided."}
      </p>

      {/* Stats row */}
      <div className="repository-meta">
        {/* Stars */}
        <div className="repository-meta-item">
          <span>⭐</span>
          <span>{formatNumber(repo.stars)}</span>
        </div>

        {/* Open issues */}
        <div className="repository-meta-item">
          <span>📋</span>
          <span>{formatNumber(repo.openIssues)}</span>
        </div>

        {/* Language */}
        {repo.language && (
          <div className="repository-meta-item">
            <span>💻</span>
            <span>{repo.language}</span>
          </div>
        )}

        {/* Last updated */}
        <div className="repository-meta-item" style={{ marginLeft: 'auto' }}>
          <span>🕐</span>
          <span>{formatLastUpdated(repo.updatedAt)}</span>
        </div>
      </div>

      {/* Tags */}
      <div className="repository-tags">
        {repo.language && (
          <span className="chip" style={{ fontSize: 'var(--font-size-label-sm)' }}>
            {repo.language}
          </span>
        )}
      </div>

      {/* Action */}
      <div className="repository-actions">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          style={{ textDecoration: 'none', width: '100%', textAlign: 'center' }}
        >
          Explore
        </a>
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
    <div className="repositories-page">

      <div className="repositories-container">
        {/* Page header */}
        <div className="repositories-header">
          <h1 className="repositories-title">Organization Repositories</h1>
          <p className="repositories-subtitle">
            Browse repositories and find beginner-friendly projects to contribute to.
          </p>
        </div>

        {/* Filter controls */}
        <div className="repositories-filters" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          {/* Language filter */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label
              htmlFor="language-filter"
              className="form-label"
              style={{ marginBottom: 'var(--spacing-sm)' }}
            >
              Filter by language
            </label>
            <select
              id="language-filter"
              value={languageFilter}
              onChange={(e) => handleFilterChange(setLanguageFilter, e.target.value)}
              className="form-select"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort dropdown */}
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label
              htmlFor="sort-by"
              className="form-label"
              style={{ marginBottom: 'var(--spacing-sm)' }}
            >
              Sort by
            </label>
            <select
              id="sort-by"
              value={sortBy}
              onChange={(e) => handleFilterChange(setSortBy, e.target.value)}
              className="form-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div style={{
            background: 'var(--color-error-container)',
            color: 'var(--color-error)',
            padding: 'var(--spacing-lg)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--spacing-lg)'
          }}>
            {error}
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-4xl) 0' }}>
            <p className="text-body-lg">Loading repositories...</p>
          </div>
        ) : (
          <>
            {/* Results count */}
            <p className="text-body-md" style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-on-surface-variant)' }}>
              Showing {repos.length} repositor{repos.length !== 1 ? "ies" : "y"}
            </p>

            {/* Repository grid */}
            <div className="repositories-grid">
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>

            {/* Empty state */}
            {repos.length === 0 && (
              <div className="repositories-empty">
                <div className="repositories-empty-icon">📭</div>
                <div className="repositories-empty-title">No repositories found</div>
                <div className="repositories-empty-description">
                  Try adjusting your filters to find more projects.
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {repos.length > 0 && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="btn-secondary"
                  style={{ opacity: page === 1 ? 0.5 : 1 }}
                >
                  ← Previous
                </button>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface-variant)' }}>
                  Page {page}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={!repos.length}
                  className="btn-secondary"
                  style={{ opacity: !repos.length ? 0.5 : 1 }}
                >
                  Next →
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
