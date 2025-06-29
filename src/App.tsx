import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import ProjectsPage from "./pages/ProjectsPage";
import TasksPage from "./pages/TasksPage";
import ReportingPage from "./pages/ReportingPage";
import UsersPage from "./pages/UsersPage";
import SupportPage from "./pages/SupportPage";

// Settings Pages
import SettingsPage from "./pages/settings/SettingsPage";
import ComingSoonPage from "./pages/ComingSoonPage";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/settings" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/reporting" element={<ReportingPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/support" element={<SupportPage />} />

          {/* Settings Routes */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="/settings/my-details"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/profile"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/password"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/team"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/plan"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/notifications"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/integrations"
            element={<ComingSoonPage title="Settings" />}
          />
          <Route
            path="/settings/api"
            element={<ComingSoonPage title="Settings" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
