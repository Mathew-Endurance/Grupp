export interface RoleUser {
  id?: string;
  name?: string;
  avatar?: string;
}

export interface Role {
  name: string;
  type: "DEFAULT" | "CUSTOM" | "SYSTEM+CUSTOM" | "SYSTEM-CUSTOM";
  date: string;
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
export interface ActiveRoleProps {
  roles: Role[];
  activeRole: string;
  onRoleSelection: (roleName: string) => void;
}

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export interface SettingsHeaderProps {
  title: string;
  description: string;
}

export interface ComingSoonPageProps {
  title: string;
  description?: string;
  activeTab?: TabName;
}

export interface RouteMetadata {
  title: string;
  description: string;
}

export interface UseRouteMetadataOptions {
  fallback?: RouteMetadata;
}

export interface UseRouteMetadataReturn extends RouteMetadata {
  isValidRoute: boolean;
  routeKey: string;
}
