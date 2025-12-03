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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Contribution
        </h2>

        {/* TITLE, REPONAME, PRLINK */}
        {["title", "repoName", "prLink"].map((key) => (
          <input
            key={key}
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-50"
          />
        ))}

        {/* DESCRIPTION AS TEXTAREA */}
        <textarea
          name="description"
          placeholder="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-50 h-28"
        ></textarea>

        {/* STATUS */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-50"
        >
          <option value="">Status</option>
          <option value="open">Open</option>
          <option value="merged">Merged</option>
          <option value="closed">Closed</option>
        </select>

        {/* DIFFICULTY */}
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-50"
        >
          <option value="">Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Save Changes
        </button>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default EditContribution;
