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
import type { RouteMetadata, SidebarItem, TabName } from "./types/type";

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

export const ROUTE_METADATA: Record<string, RouteMetadata> = {
  "/": {
    title: "Home",
    description: "Your personalized dashboard and overview.",
  },
  "/dashboard": {
    title: "Dashboard",
    description: "View your analytics and performance metrics.",
  },
  "/projects": {
    title: "Projects",
    description: "Manage and track your ongoing projects.",
  },
  "/tasks": {
    title: "Tasks",
    description: "Organize and manage your tasks and to-dos.",
  },
  "/reporting": {
    title: "Reporting",
    description: "View and generate reports for your activities.",
  },
  "/users": {
    title: "Users",
    description: "Manage team members, roles, and permissions",
  },
  "/support": {
    title: "Support",
    description: "Get help and support for your questions.",
  },
};
export const DEFAULT_METADATA: RouteMetadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist",
};
