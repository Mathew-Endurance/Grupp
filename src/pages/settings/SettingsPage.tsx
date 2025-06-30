import React, { useState } from "react";
import type { TabName } from "../../types/type";
import PageHeader from "../../components/common/PageHeader";
import TabNavigation from "../../components/common/TabNavigation";
import { tabs } from "../../data";
import { Outlet } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Roles");

  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your team and preferences here."
      />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
        usePagination={true}
      />
      <Outlet />
    </>
  );
};

export default SettingsPage;
