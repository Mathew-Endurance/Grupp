export interface RoleUser {
  id?: string;
  name?: string;
  avatar?: string;
}

export interface Role {
  name: string;
  type: "DEFAULT" | "CUSTOM" | "SYSTEM+CUSTOM" | "SYSTEM-CUSTOM";
  date_created: string;
  status: "Active" | "Inactive";
  role_users?: RoleUser[];
  users?: string[]; // Array of avatar URLs
  totalUser?: number;
  icon?: string;
}

export interface SidebarItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  active: boolean;
  count?: number;
}

export type TabName =
  | "My details"
  | "Profile"
  | "Password"
  | "Team"
  | "Plan"
  | "Roles"
  | "Notifications"
  | "Integrations"
  | "API";

// export interface SettingsPageProps {
//   // Add props if needed in the future
// }
