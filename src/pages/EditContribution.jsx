import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function EditContribution() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    repoName: "",
    description: "",
    prLink: "",
    status: "",
    difficulty: "",
  });

  const [message, setMessage] = useState("");

  // Fetch single contribution data
  const fetchContribution = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(`/contributions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setForm(res.data.contribution);
    } catch (err) {
      console.log(err);
      setMessage("Error loading contribution");
    }
  };

  useEffect(() => {
    fetchContribution();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit updates
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/contributions/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Updated successfully ✔️");
      setTimeout(() => navigate("/contributions"), 1500);
    } catch (err) {
      console.log(err);
      setMessage("Update failed");
    }
  };

  return (
    <div className="contributions-page">

      <div className="contributions-container">
        <div className="contributions-header">
          <h1 className="contributions-title">Edit Contribution</h1>
          <p className="contributions-subtitle">Update your contribution details</p>
        </div>

        <div className="contributions-card">
          <form onSubmit={handleSubmit} className="contributions-form">
            <div className="form-section">
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Contribution title"
                  value={form.title}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Repository Name</label>
                <input
                  type="text"
                  name="repoName"
                  placeholder="Repository name"
                  value={form.repoName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  placeholder="Describe your contribution"
                  value={form.description}
                  onChange={handleChange}
                  className="form-textarea"
                />
              </div>

              <div className="form-group">
                <label className="form-label">PR Link</label>
                <input
                  type="url"
                  name="prLink"
                  placeholder="Link to your pull request"
                  value={form.prLink}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select status</option>
                    <option value="open">Open</option>
                    <option value="merged">Merged</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Difficulty</label>
                  <select
                    name="difficulty"
                    value={form.difficulty}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {message && <p style={{ color: message.includes('successfully') ? 'var(--color-success)' : 'var(--color-error)', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>{message}</p>}

            <div className="contributions-actions">
              <button type="submit" className="btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/contributions")}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditContribution;
