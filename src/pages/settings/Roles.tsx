import { useEffect, useState } from "react";
import ActiveRole from "./ActiveRole";
import UserRolesTable from "../../components/UserRolesTable";
import type { Role } from "../../types/type";
import { generateAvatars } from "../../utils/util";
import EmailSettings from "../../components/EmailSettings";

const Roles = () => {
  const handleRoleSelection = (roleName: string): void => {
    setActiveRole(roleName);
  };

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<string>("Superadmin");

  useEffect(() => {
    const fetchRoles = async (): Promise<void> => {
      try {
        const response = await fetch("https://gamma-api.vercel.app/api/roles");
        const data = (await response.json()) as Array<Role>;
    
        setRoles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return (
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
  );
};

export default Roles;
