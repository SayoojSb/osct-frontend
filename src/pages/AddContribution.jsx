import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded shadow"
        >
          <h2 className="text-2xl font-bold mb-4">Add Contribution</h2>

          {Object.keys(form).map((key) => (
            <input
              key={key}
              name={key}
              placeholder={key}
              value={form[key]}
              onChange={handleChange}
              className="w-full mb-3 p-3 border rounded bg-gray-50"
            />
          ))}

          <button className="w-full p-3 bg-blue-600 text-white rounded">
            Submit
          </button>

          {message && <p className="text-center text-green-600 mt-3">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default AddContribution;
