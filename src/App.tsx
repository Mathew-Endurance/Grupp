import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

// Settings Pages
import SettingsPage from "./pages/settings/SettingsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import PageLayout from "./layout/PageLayout";
import Roles from "./pages/settings/Roles";

function App() {
  return (
    <div className="w-full min-h-screen">
      <Router>
        <Routes>
          <Route element={<PageLayout />}>
            <Route path="/*" element={<DashboardPage />} />

            {/* Settings Routes */}
            <Route element={<SettingsPage />}>
              <Route path="/settings" element={<Roles />} />
              <Route
                path="/settings/*"
                element={<ComingSoonPage title="Settings" />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
