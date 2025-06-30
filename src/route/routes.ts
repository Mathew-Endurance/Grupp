import type { TabName } from "../types/type";

// Define route types
export type RouteKey =
  | "home"
  | "dashboard"
  | "projects"
  | "tasks"
  | "reporting"
  | "users"
  | "support"
  | "settings"
  | "myDetails"
  | "profile"
  | "password"
  | "team"
  | "plan"
  | "roles"
  | "notifications"
  | "integrations"
  | "api";

// Map route keys to paths
export const ROUTES: Record<RouteKey, string> = {
  home: "/",
  dashboard: "/dashboard",
  projects: "/projects",
  tasks: "/tasks",
  reporting: "/reporting",
  users: "/users",
  support: "/support",
  settings: "/settings",
  myDetails: "/settings/my-details",
  profile: "/settings/profile",
  password: "/settings/password",
  team: "/settings/team",
  plan: "/settings/plan",
  roles: "/settings", // Default settings page
  notifications: "/settings/notifications",
  integrations: "/settings/integrations",
  api: "/settings/api",
};

export const getLabelRouteKey = (label: string): RouteKey => {
  const labelToRouteMap: Record<string, RouteKey> = {
    Home: "home",
    Dashboard: "dashboard",
    Projects: "projects",
    Tasks: "tasks",
    Reporting: "reporting",
    Users: "users",
    Support: "support",
    Settings: "settings",
  };

  return labelToRouteMap[label] || "home";
};

export const getTabRouteKey = (tab: TabName): RouteKey => {
  const tabToRouteMap: Record<TabName, RouteKey> = {
    "My details": "myDetails",
    Profile: "profile",
    Password: "password",
    Team: "team",
    Plan: "plan",
    Roles: "roles",
    Notifications: "notifications",
    Integrations: "integrations",
    API: "api",
  };

  return tabToRouteMap[tab];
};

// Helper function to get route path from label
export const getRouteFromLabel = (label: string): string => {
  const routeKey = getLabelRouteKey(label);
  return ROUTES[routeKey];
};

// Helper function to get route path from tab name
export const getRouteFromTab = (tab: TabName): string => {
  const routeKey = getTabRouteKey(tab);
  return ROUTES[routeKey];
};
