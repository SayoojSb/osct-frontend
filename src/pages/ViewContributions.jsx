import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";

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

  // -----------------------
  // FETCH DATA
  // -----------------------
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

  // -----------------------
  // DELETE FUNCTION (FIXED)
  // -----------------------
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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Your Contributions
        </h2>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-5">
          <input
            placeholder="Search title/repo"
            className="p-3 border rounded bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-3 border rounded bg-white"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Status</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="merged">Merged</option>
          </select>

          <select
            className="p-3 border rounded bg-white"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>

          <select
            className="p-3 border rounded bg-white"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Repo</th>
                <th className="p-3">Status</th>
                <th className="p-3">Difficulty</th>
                <th className="p-3">Actions</th> {/* FIXED */}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    No records
                  </td>
                </tr>
              ) : (
                data.map((c) => (
                  <tr key={c._id} className="border-b">
                    <td className="p-3">{c.title}</td>
                    <td className="p-3">{c.repoName}</td>
                    <td className="p-3">{c.status}</td>
                    <td className="p-3">{c.difficulty}</td>

                    <td className="p-3 flex gap-2">

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
                      >
                        Delete
                      </button>

                      {/* EDIT BUTTON (FIXED navigate) */}
                      <button
                        onClick={() => navigate(`/edit/${c._id}`)}
                        className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
                      >
                        Edit
                      </button>

                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            disabled={page <= 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>

          <button
            disabled={page >= (pagination.totalPages || 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewContributions;
