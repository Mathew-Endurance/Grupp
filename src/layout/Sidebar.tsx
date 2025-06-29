import React from "react";
import { Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "../types/settings";
import { getRouteFromLabel } from "../utils/routes";
import { classNames, COMPONENT_STYLES } from "../utils/styles";

interface SidebarProps {
  sidebarItems: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems }) => {
  const location = useLocation();

  // Check if the current route matches this item's route
  const isActive = (label: string): boolean => {
    const route = getRouteFromLabel(label);
    if (route === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(route) && route !== "/";
  };

  return (
    <div className="w-64 bg-white border-r min-h-screen">
      <div className="p-6">
        <Link to="/" className="block">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <span className="font-semibold">Untitled UI</span>
          </div>
        </Link>

        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Olivia Rhye"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <Users className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item: SidebarItem, index: number) => {
            const active = isActive(item.label);
            return (
              <Link
                key={index}
                to={getRouteFromLabel(item.label)}
                className={classNames(
                  "flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer",
                  active
                    ? COMPONENT_STYLES.activeState.sidebar
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    size={20}
                    className={
                      active ? COMPONENT_STYLES.activeState.default : ""
                    }
                  />
                  <span
                    className={
                      active ? COMPONENT_STYLES.activeState.default : ""
                    }
                  >
                    {item.label}
                  </span>
                </div>
                {item.count && (
                  <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-sm">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">New features available!</h4>
          <p className="text-sm text-gray-600 mb-3">
            Check out the new dashboard view. Pages now load faster.
          </p>
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face"
              alt="Dismiss"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">Dismiss</p>
              <p className="text-xs text-gray-500">What's new?</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-3 p-3 border rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Olivia Rhye"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <p className="font-medium">Olivia Rhye</p>
            <p className="text-sm text-gray-500">olivia@untitledui.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
