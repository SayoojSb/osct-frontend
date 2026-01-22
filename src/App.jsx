import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LearnOverview from "./pages/LearnOverview";
import LearnStep from "./pages/LearnStep";

import AddContribution from "./pages/AddContribution";
import ViewContributions from "./pages/ViewContributions";
import EditContribution from "./pages/EditContribution";
// oauth github
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  return (
    <Routes>
      {/* Public landing page */}
      <Route path="/" element={<Landing />} />
      
      {/* Learning overview page */}
      <Route path="/learn" element={<LearnOverview />} />

      {/* Individual step learning page */}
      <Route path="/learn/:stepId" element={<LearnStep />} />

      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Dashboard Route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/*  */}
      <Route
        path="/add"
        element={
          <ProtectedRoute>
            <AddContribution />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contributions"
        element={
          <ProtectedRoute>
            <ViewContributions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit/:id"
        element={
          <ProtectedRoute>
            <EditContribution />
          </ProtectedRoute>
        }
      />

      <Route path="/auth/success" element={<AuthSuccess />} />

    </Routes>
  );
}

export default App;
