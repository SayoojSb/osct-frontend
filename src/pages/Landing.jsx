import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Welcome to OSCT
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          A friendly space to learn and grow at your own pace. 
          No pressure, just helpful tools to support your journey.
        </p>
        
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start learning
        </Link>

      </div>
    </div>
  );
}

export default Landing;

