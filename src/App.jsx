import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

import AddContribution from "./pages/AddContribution";
import ViewContributions from "./pages/ViewContributions";
import EditContribution from "./pages/EditContribution";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

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


    </Routes>
  );
}

export default App;
