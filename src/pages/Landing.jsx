import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Logo or icon could go here */}
        
        {/* Main heading */}
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Welcome to OSCT
        </h1>
        
        {/* Supportive description */}
        <p className="text-lg text-gray-600 mb-8">
          A friendly space to learn and grow at your own pace. 
          No pressure, just helpful tools to support your journey.
        </p>
        
        {/* Primary action button */}
        <Link
          to="/learn"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start learning
        </Link>
        
        {/* Secondary link */}
        <div className="mt-6">
          <Link
            to="/learn"
            className="text-gray-500 hover:text-gray-700 underline"
          >
            How this works
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;

