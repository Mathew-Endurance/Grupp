import React from "react";
import { Link } from "react-router-dom";
import type { TabName } from "../../types/settings";

interface TabNavigationProps {
  tabs: TabName[];
  activeTab: TabName;
  onTabClick?: (tab: TabName) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabClick,
}) => {
  // Map tabs to their routes
  const getTabRoute = (tab: TabName): string => {
    const tabRouteMap: Record<TabName, string> = {
      "My details": "/settings/my-details",
      Profile: "/settings/profile",
      Password: "/settings/password",
      Team: "/settings/team",
      Plan: "/settings/plan",
      Roles: "/settings",
      Notifications: "/settings/notifications",
      Integrations: "/settings/integrations",
      API: "/settings/api",
    };

    return tabRouteMap[tab] || "/settings";
  };

  return (
    <div className="border-b mb-6 overflow-x-auto">
      <nav className="flex space-x-4 md:space-x-8 min-w-max">
        {tabs.map((tab) => (
          <Link
            key={tab}
            to={getTabRoute(tab)}
            onClick={() => onTabClick && onTabClick(tab)}
            className={`py-2 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === tab
                ? "border-purple-500 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default TabNavigation;
