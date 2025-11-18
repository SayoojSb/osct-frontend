import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/signup", {
        username,
        email,
        password,
      });

      setMessage(res.data.message);

      // OPTIONAL: auto redirect after signup
      // navigate("/login");

    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Create Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}

        <div className="mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-bold"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;
