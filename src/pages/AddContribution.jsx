import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function AddContribution() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    repoName: "",
    description: "",
    prLink: "",
    status: "",
    difficulty: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/contributions",
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Added successfully!");
      navigate("/contributions");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="contributions-page">

      <div className="contributions-container">
        <div className="contributions-header">
          <h1 className="contributions-title">Add Contribution</h1>
          <p className="contributions-subtitle">Share your open source contribution</p>
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
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="merged">Merged</option>
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

            {message && <p className="form-error">{message}</p>}

            <div className="contributions-actions">
              <button type="submit" className="btn-primary">
                Submit Contribution
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

export default AddContribution;
