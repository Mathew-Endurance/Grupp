import {
  Home,
  BarChart3,
  FolderOpen,
  CheckSquare,
  PieChart,
  Users,
  HelpCircle,
  Settings,
} from "lucide-react";
import type { SidebarItem, TabName } from "./types/settings";

export const sidebarItems: SidebarItem[] = [
  { icon: Home, label: "Home", active: false },
  { icon: BarChart3, label: "Dashboard", count: 10, active: false },
  { icon: FolderOpen, label: "Projects", active: false },
  { icon: CheckSquare, label: "Tasks", active: false },
  { icon: PieChart, label: "Reporting", active: false },
  { icon: Users, label: "Users", active: false },
  { icon: HelpCircle, label: "Support", active: false },
  { icon: Settings, label: "Settings", active: true },
];

export const tabs: TabName[] = [
  "My details",
  "Profile",
  "Password",
  "Roles",
  "Team",
  "Plan",

  "Notifications",
  "Integrations",
  "API",
];

export const tableHeaders: string[] = [
  "",
  "Name",
  "Type",
  "Date Created",
  "Status",
  "Role users",
  "Actions",
];
