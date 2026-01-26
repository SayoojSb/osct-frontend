import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Learn How to Make Your First PR",
      description: "Step-by-step beginner-friendly guide",
      badge: "Recommended for Beginners",
      buttonText: "Start Learning",
      onClick: () => navigate("/learn"),
      isPrimary: true,
    },
    {
      title: "Start with Easy Issues",
      description: "Handpicked beginner-friendly repositories",
      buttonText: "View Easy Issues",
      onClick: () => navigate("/repo-issues"),
      isPrimary: false,
    },
    {
      title: "Explore Open Source Repositories",
      description: "Browse organizations, stars, activity & languages",
      buttonText: "Explore Repos",
      onClick: () => navigate("/org-repos"),
      isPrimary: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Welcome to OSCT 👋
          </h1>
          <p className="text-xl text-gray-600">
            Choose how you want to begin your open-source journey
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={card.onClick}
              className={`
                bg-white rounded-2xl p-6 cursor-pointer
                transition-all duration-300 ease-in-out
                hover:shadow-xl hover:-translate-y-1
                border border-gray-100
                flex flex-col
                ${card.isPrimary ? "ring-2 ring-blue-500 shadow-lg" : "shadow-md"}
              `}
            >
              {/* Badge for primary card */}
              {card.isPrimary && (
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full mb-4 w-fit">
                  {card.badge}
                </span>
              )}

              {/* Card Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                {card.title}
              </h2>

              {/* Card Description */}
              <p className="text-gray-600 mb-6 flex-grow">
                {card.description}
              </p>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  card.onClick();
                }}
                className={`
                  w-full py-3 px-4 rounded-lg font-medium
                  transition-colors duration-200
                  ${
                    card.isPrimary
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

