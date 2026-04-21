import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function ViewContributions() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);


  const fetchData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/contributions", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: 5, search, status, difficulty, sort }
      });

      setData(res.data.contributions);
      setPagination(res.data.pagination);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page, search, status, difficulty, sort]);

 
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Delete this contribution?")) return;

    try {
      await API.delete(`/contributions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchData(); // refresh AFTER delete completes
      alert("Deleted successfully!");

    } catch (err) {
      console.log("DELETE ERROR:", err.response?.data || err.message);
      alert("Delete failed");
    }
  };

  return (
    <div className="contributions-page">

      <div className="contributions-container">
        <div className="contributions-header">
          <h1 className="contributions-title">Your Contributions</h1>
          <p className="contributions-subtitle">Manage and track your open source contributions</p>
        </div>

        {/* FILTERS */}
        <div className="repositories-filters" style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <input
            placeholder="Search title/repo"
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: '200px' }}
          />

          <select
            className="form-select"
            onChange={(e) => setStatus(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="merged">Merged</option>
          </select>

          <select
            className="form-select"
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="form-select"
            onChange={(e) => setSort(e.target.value)}
            style={{ minWidth: '150px' }}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        {/* CONTRIBUTIONS LIST */}
        <div className="contributions-list">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
              <p className="text-body-lg">Loading...</p>
            </div>
          ) : data.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
              <p className="text-body-lg">No contributions found</p>
            </div>
          ) : (
            data.map((c) => (
              <div key={c._id} className="contribution-item">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="contribution-item-title">{c.title}</h3>
                    <div className="contribution-item-meta">
                      <span>📦 {c.repoName}</span>
                      <span>📊 {c.status}</span>
                      <span>⚡ {c.difficulty}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexShrink: 0 }}>
                    <button
                      onClick={() => navigate(`/edit/${c._id}`)}
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: 'var(--font-size-body-sm)' }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="btn-tertiary"
                      style={{ color: 'var(--color-error)', padding: '6px 12px', fontSize: 'var(--font-size-body-sm)' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-lg)', marginTop: 'var(--spacing-2xl)' }}>
          <button
            disabled={page <= 1}
            className="btn-secondary"
            onClick={() => setPage(page - 1)}
            style={{ opacity: page <= 1 ? 0.5 : 1 }}
          >
            ← Previous
          </button>

          <span style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface-variant)' }}>
            Page {page} of {pagination.totalPages || 1}
          </span>

          <button
            disabled={page >= (pagination.totalPages || 1)}
            className="btn-secondary"
            onClick={() => setPage(page + 1)}
            style={{ opacity: page >= (pagination.totalPages || 1) ? 0.5 : 1 }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewContributions;
