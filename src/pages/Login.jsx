import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>

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
          Login
        </button>

        {message && <p className="mt-4 text-red-500">{message}</p>}

        <div className="mt-4">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-bold"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
