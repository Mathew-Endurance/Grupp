import React from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import type { SidebarItem } from "../types/type";
import { getRouteFromLabel } from "../route/routes";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  handleMobileMenuToggle: () => void;
  sidebarItems: SidebarItem[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isMobileMenuOpen,
  handleMobileMenuToggle,
  sidebarItems,
}) => {
  const location = useLocation();

  // Check if the current route matches this item's route
  const isActive = (label: string, defaultActive: boolean): boolean => {
    const path = location.pathname;
    const route = getRouteFromLabel(label);

    if (path === "/" && defaultActive) return true;
    if (label === "Settings" && path === "/settings") return true;
    if (route === "/" && path === "/") return true;
    return path.startsWith(route) && route !== "/";
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white opacity-100 px-4 py-3 flex items-center justify-between shadow-sm fixed top-0 left-0 w-full z-50">
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <span className="text-white text-sm font-semibold">U</span>
          </div>
          <span className="font-semibold">Untitled UI</span>
        </Link>
        <button
          onClick={handleMobileMenuToggle}
          className="p-2 rounded hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-300 bg-opacity-50">
          <div className="fixed top-0 left-0 w-64 h-full bg-white p-6 overflow-y-auto z-50 shadow-lg">
            <div className="flex justify-end mb-4">
              <button
                onClick={handleMobileMenuToggle}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="space-y-1">
              {sidebarItems.map((item: SidebarItem, index: number) => {
                const active = isActive(item.label, item.active);
                const route = getRouteFromLabel(item.label);

                return (
                  <Link
                    key={index}
                    to={route}
                    onClick={handleMobileMenuToggle}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer ${
                      active
                        ? "bg-purple-50 text-purple-600 border-l-4 border-purple-600"
                        : "text-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon
                        size={20}
                        className={active ? "text-purple-600" : ""}
                      />
                      <span className={active ? "text-purple-600" : ""}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
