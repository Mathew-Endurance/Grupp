import React from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import PageHeader from "../components/common/PageHeader";
import ComingSoon from "../components/common/ComingSoon";
import TabNavigation from "../components/common/TabNavigation";
import { tabs } from "../data";
import type { ComingSoonPageProps, TabName } from "../types/settings";

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  title,
  description = "Manage your team and preferences here.",
  activeTab,
}) => {
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
    <PageLayout>
      <PageHeader title={title} description={description} />

      {(title === "Settings" || activeTab) && (
        <TabNavigation tabs={tabs} activeTab={currentActiveTab} />
      )}

      <ComingSoon
        title={`${currentActiveTab} Coming Soon`}
        description={`The ${currentActiveTab.toLowerCase()} page is under development and will be available soon.`}
      />
    </PageLayout>
  );
};

export default ComingSoonPage;
