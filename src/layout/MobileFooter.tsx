import React from "react";
import { Home, Settings, Search, Bell } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileFooter: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    if (path === "/" && location.pathname === "/") {
      return true;
    }
    return location.pathname.startsWith(path) && path !== "/";
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4 flex justify-between items-center lg:hidden">
      <Link to="/" className="flex flex-col items-center px-4 py-1">
        <Home
          size={20}
          className={isActive("/") ? "text-purple-600" : "text-gray-500"}
        />
        <span
          className={`text-xs mt-1 ${
            isActive("/") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          Home
        </span>
      </Link>

      <button className="flex flex-col items-center px-4 py-1">
        <Search size={20} className="text-gray-500" />
        <span className="text-xs text-gray-500 mt-1">Search</span>
      </button>

      <button className="flex flex-col items-center px-4 py-1">
        <Bell size={20} className="text-gray-500" />
        <span className="text-xs text-gray-500 mt-1">Notifications</span>
      </button>

      <Link to="/settings" className="flex flex-col items-center px-4 py-1">
        <Settings
          size={20}
          className={
            isActive("/settings") ? "text-purple-600" : "text-gray-500"
          }
        />
        <span
          className={`text-xs mt-1 ${
            isActive("/settings") ? "text-purple-600" : "text-gray-500"
          }`}
        >
          Settings
        </span>
      </Link>
    </div>
  );
};

export default MobileFooter;
