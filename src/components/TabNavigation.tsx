import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TabName } from "../types/settings";

interface TabNavigationProps {
  tabs: TabName[];
  activeTab: TabName;
  onTabClick: (tab: TabName) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  tabs,
  activeTab,
  onTabClick,
}) => {
  const tabsPerPage = 3;
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + tabsPerPage;

  const visibleTabs = tabs.slice(startIndex, endIndex);
  const canGoBack = startIndex > 0;
  const canGoForward = endIndex < tabs.length;

  const handlePrev = () => {
    if (canGoBack) setStartIndex(startIndex - tabsPerPage);
  };

  const handleNext = () => {
    if (canGoForward) setStartIndex(startIndex + tabsPerPage);
  };

  return (
    <div className="mb-6">
      {/* Mobile: paginated view */}
      <div className="flex items-center space-x-2 md:hidden">
        <button
          onClick={handlePrev}
          disabled={!canGoBack}
          className="disabled:opacity-30"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex w-full border border-gray-400 rounded-md overflow-hidden">
          {visibleTabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={() => onTabClick(tab)}
              className={`flex-1 text-center py-2 text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab
                  ? "bg-purple-100 text-gray-900"
                  : "text-gray-700 hover:bg-gray-50"
              } ${
                idx < visibleTabs.length - 1 ? "border-r border-gray-400" : ""
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!canGoForward}
          className=" disabled:opacity-30"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Desktop: full tab list */}
      <div className="hidden md:inline-flex border border-gray-400 rounded-md overflow-hidden">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            onClick={() => onTabClick(tab)}
            className={`px-0 md:px-4 py-2 test-xs md:text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab
                ? "bg-gray-100 text-gray-900"
                : "text-gray-700 hover:bg-gray-50"
            } ${idx < tabs.length - 1 ? "border-r border-gray-400" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
