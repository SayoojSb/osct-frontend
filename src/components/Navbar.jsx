import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="w-full p-4 bg-white shadow-md flex justify-between items-center">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-xl font-bold cursor-pointer"
      >
        OSCT App
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/add")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Add
        </button>

        <button
          onClick={() => navigate("/contributions")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          View
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
