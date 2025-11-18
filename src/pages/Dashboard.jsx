import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-10 text-center">
        <h2 className="text-3xl font-bold">Welcome to Dashboard 🎉</h2>
        <p className="mt-4 text-gray-600">
          You are logged in using a protected route.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
