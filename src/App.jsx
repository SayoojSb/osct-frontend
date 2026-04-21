import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";
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

      {/* PROTECTED ROUTES WITH SIDEBAR LAYOUT */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dashboard - main hub after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Learning pages */}
        <Route path="/learn" element={<LearnOverview />} />
        <Route path="/learn/:stepId" element={<LearnStep />} />

        {/* Navigator page */}
        <Route path="/navigator" element={<Navigator />} />

        {/* Organization repositories page */}
        <Route path="/org-repos" element={<OrgRepos />} />

        {/* Repo issues page - choose beginner-friendly issue */}
        <Route path="/repo-issues" element={<RepoIssues />} />

        {/* Execute page - support for opening PR */}
        <Route path="/execute" element={<Execute />} />

        {/* Success page - PR submitted confirmation */}
        <Route path="/success" element={<Success />} />

        {/* Existing CRUD routes */}
        <Route path="/add" element={<AddContribution />} />
        <Route path="/contributions" element={<ViewContributions />} />
        <Route path="/edit/:id" element={<EditContribution />} />
      </Route>
    </Routes>
  );
}

export default App;

