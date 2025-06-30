import React from "react";
import { useLocation } from "react-router-dom";
import ComingSoon from "../components/common/ComingSoon";
import type { ComingSoonPageProps, TabName } from "../types/type";

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ activeTab }) => {
  const location = useLocation();

  // Determine active tab from URL path
  const getActiveTabFromPath = (): TabName => {
    const path = location.pathname;
    if (path.includes("/my-details")) return "My details";
    if (path.includes("/profile")) return "Profile";
    if (path.includes("/password")) return "Password";
    if (path.includes("/team")) return "Team";
    if (path.includes("/plan")) return "Plan";
    if (path.includes("/notifications")) return "Notifications";
    if (path.includes("/integrations")) return "Integrations";
    if (path.includes("/api")) return "API";
    if (path === "/settings") return "Roles";
    return activeTab || "Roles";
  };

  const currentActiveTab = getActiveTabFromPath();

  return (
    <ComingSoon
      title={`${currentActiveTab} Coming Soon`}
      description={`The ${currentActiveTab.toLowerCase()} page is under development and will be available soon.`}
    />
  );
};

export default ComingSoonPage;
