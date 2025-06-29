import React, { useState, useEffect } from "react";
import type { Role, TabName } from "../../types/settings";
import PageLayout from "../../layout/PageLayout";
import PageHeader from "../../components/common/PageHeader";
import TabNavigation from "../../components/common/TabNavigation";
import EmailSettings from "../../components/EmailSettings";
import ActiveRole from "../../components/ActiveRole";
import UserRolesTable from "../../components/UserRolesTable";
import { generateAvatars } from "../../utils/util";
import { tabs } from "../../data";

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Roles");
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<string>("Superadmin");

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      try {
        // Try to fetch from the API
        const response = await fetch("https://gamma-api.vercel.app/api/roles");
        const data = (await response.json()) as Array<{
          name: string;
          type: string;
          date?: string;
          date_created?: string;
          status: "Active" | "Inactive";
          users?: string[];
          totalUser?: number;
          role_users?: Array<Record<string, unknown>>;
        }>;

        // Transform API response to match our Role interface if needed
        const transformedRoles: Role[] = data.map((item) => ({
          name: item.name,
          type: item.type as Role["type"],
          date_created: item.date || item.date_created || "",
          status: item.status,
          users: item.users,
          totalUser: item.totalUser,
          role_users: item.role_users,
        }));

        setRoles(transformedRoles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleRoleSelection = (roleName: string): void => {
    setActiveRole(roleName);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Settings"
        description="Manage your team and preferences here."
      />

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {/* User Roles Section */}
      <div className="space-y-4 md:space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-lg font-semibold mb-2">User Roles</h2>
          <p className="text-gray-600">
            Update your roles details and information.
          </p>
        </div>

        <EmailSettings />

        <ActiveRole
          roles={roles}
          activeRole={activeRole}
          onRoleSelection={handleRoleSelection}
        />

        <UserRolesTable
          roles={roles}
          loading={loading}
          generateAvatars={generateAvatars}
        />
      </div>
    </PageLayout>
  );
};

export default SettingsPage;
