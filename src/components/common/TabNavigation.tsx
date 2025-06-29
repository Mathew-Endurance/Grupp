import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { TabName } from "../../types/settings";
import { getRouteFromTab } from "../../utils/routes";
import { classNames } from "../../utils/styles";

interface TabNavigationProps {
  tabs: TabName[];
  activeTab: TabName;
  onTabClick?: (tab: TabName) => void;
  usePagination?: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabClick,
  usePagination = true,
}) => {
  const tabsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);

  const endIndex = Math.min(startIndex + tabsPerPage, tabs.length);
  const visibleTabs = usePagination ? tabs.slice(startIndex, endIndex) : tabs;

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    if (activeTabIndex >= 0) {
      if (activeTabIndex < startIndex) {
        setStartIndex(Math.max(0, activeTabIndex - (tabsPerPage - 1)));
      } else if (activeTabIndex >= endIndex) {
        setStartIndex(Math.min(activeTabIndex, tabs.length - tabsPerPage));
      }
    }
  }, [activeTab, tabs, startIndex, endIndex]);

  const handleTabClick = (tab: TabName) => {
    const tabIndex = tabs.indexOf(tab);
    if (tabIndex === -1) return;

    if (onTabClick) onTabClick(tab);

    if (usePagination) {
      if (tabIndex === endIndex - 1 && endIndex < tabs.length) {
        setStartIndex(Math.min(tabIndex, tabs.length - tabsPerPage));
      } else if (tabIndex === startIndex && startIndex > 0) {
        setStartIndex(Math.max(0, tabIndex - (tabsPerPage - 1)));
      }
    }
  };

  return (
    <div className="mb-6">
      {usePagination && (
        <div className="w-full border border-gray-400 rounded-md overflow-hidden md:hidden">
          <div className="flex">
            {visibleTabs.map((tab, idx) => (
              <Link
                key={tab}
                to={getRouteFromTab(tab)}
                onClick={() => handleTabClick(tab)}
                className={classNames(
                  "flex-1 text-center py-2 text-sm font-medium whitespace-nowrap transition-all",
                  activeTab === tab
                    ? "bg-purple-100 text-gray-900"
                    : "text-gray-700 hover:bg-gray-50",
                  idx < visibleTabs.length - 1 ? "border-r border-gray-400" : ""
                )}
              >
                {tab}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop version */}
      <div className="hidden md:block">
        <div className="inline-flex border border-gray-300 rounded-lg overflow-hidden bg-white">
          {tabs.map((tab, idx) => (
            <Link
              key={tab}
              to={getRouteFromTab(tab)}
              onClick={() => handleTabClick(tab)}
              className={classNames(
                "px-4 py-3 text-sm font-medium whitespace-nowrap transition-all",
                activeTab === tab
                  ? "bg-gray-100 text-gray-900"
                  : "bg-white text-gray-700 hover:bg-gray-50",
                idx < tabs.length - 1 ? "border-r border-gray-300" : ""
              )}
            >
              {tab}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
