import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import LearnOverview from "./pages/LearnOverview";
import LearnStep from "./pages/LearnStep";
import Navigator from "./pages/Navigator";
import OrgRepos from "./pages/OrgRepos";
import RepoIssues from "./pages/RepoIssues";
import Execute from "./pages/Execute";
import Success from "./pages/Success";

import AddContribution from "./pages/AddContribution";
import ViewContributions from "./pages/ViewContributions";
import EditContribution from "./pages/EditContribution";
// oauth github
import AuthSuccess from "./pages/AuthSuccess";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/auth/success" element={<AuthSuccess />} />

      {/* PROTECTED ROUTES */}
      {/* Dashboard - main hub after login */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Learning pages */}
      <Route
        path="/learn"
        element={
          <ProtectedRoute>
            <LearnOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:stepId"
        element={
          <ProtectedRoute>
            <LearnStep />
          </ProtectedRoute>
        }
      />

      {/* Navigator page */}
      <Route
        path="/navigator"
        element={
          <ProtectedRoute>
            <Navigator />
          </ProtectedRoute>
        }
      />

      {/* Organization repositories page */}
      <Route
        path="/org-repos"
        element={
          <ProtectedRoute>
            <OrgRepos />
          </ProtectedRoute>
        }
      />

      {/* Repo issues page - choose beginner-friendly issue */}
      <Route
        path="/repo-issues"
        element={
          <ProtectedRoute>
            <RepoIssues />
          </ProtectedRoute>
        }
      />

      {/* Execute page - support for opening PR */}
      <Route
        path="/execute"
        element={
          <ProtectedRoute>
            <Execute />
          </ProtectedRoute>
        }
      />

      {/* Success page - PR submitted confirmation */}
      <Route
        path="/success"
        element={
          <ProtectedRoute>
            <Success />
          </ProtectedRoute>
        }
      />

      {/* Existing CRUD routes */}
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

