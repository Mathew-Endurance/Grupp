import React from "react";
import { LogOut, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "../types/type";
import { getRouteFromLabel } from "../route/routes";
import { classNames, COMPONENT_STYLES } from "../styles";

interface SidebarProps {
  sidebarItems: SidebarItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems }) => {
  const location = useLocation();

  const isActive = (label: string, defaultActive: boolean): boolean => {
    const path = location.pathname;
    const route = getRouteFromLabel(label);

    if (
      label === "Settings" &&
      (path === "/" || path.startsWith("/settings"))
    ) {
      return true;
    }

    if (path === "/" && defaultActive) return true;

    return path === route || (route !== "/" && path.startsWith(route));
  };

  const renderSidebarLink = (item: SidebarItem, index: number) => {
    const active = isActive(item.label, item.active);
    const route = getRouteFromLabel(item.label);

    return (
      <Link
        key={index}
        to={route}
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
            className={active ? COMPONENT_STYLES.activeState.default : ""}
          />
          <span className={active ? COMPONENT_STYLES.activeState.default : ""}>
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
  };

  return (
    <aside className="w-70 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6 space-y-6">
        {/* Brand */}
        <Link to="/" className="block">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
              <span className="text-white text-sm font-semibold">U</span>
            </div>
            <span className="font-semibold">Untitled UI</span>
          </div>
        </Link>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Olivia Rhye"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Users className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">{sidebarItems.map(renderSidebarLink)}</nav>

        {/* Feature Card */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">New features available!</h4>
          <p className="text-sm text-gray-600 mb-3">
            Check out the new dashboard view. Pages now load faster.
          </p>
          <div className="flex flex-col space-y-2">
            <img src="/video-image.png" alt="Feature preview" />
            <div>
              <p className="text-sm font-medium">Dismiss</p>
              <p className="text-xs text-gray-500">What's new?</p>
            </div>
          </div>
        </div>

        {/* User Footer */}
        <div className="flex items-center justify-between p-3 border rounded-lg mt-6">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Olivia Rhye"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 ml-3">
            <p className="font-medium leading-tight">Olivia Rhye</p>
            <p className="text-sm text-gray-500">olivia@untitledui.com</p>
          </div>
          <LogOut size={20} className="text-gray-500 hover:text-gray-700" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
