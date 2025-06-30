import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import MobileFooter from "./MobileFooter";
import { sidebarItems } from "../data";
import { Outlet } from "react-router-dom";

const PageLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleMobileMenuToggle = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 pb-16 lg:pb-0">
      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        handleMobileMenuToggle={handleMobileMenuToggle}
        sidebarItems={sidebarItems}
      />

      <div className="flex w-full mt-16 md:mt-2">
        <div className="hidden lg:block">
          <Sidebar sidebarItems={sidebarItems} />
        </div>

        <div className="flex-1 w-full">
          <div className="p-4 lg:p-8">
            <Outlet />
          </div>
        </div>
      </div>

      <MobileFooter />
    </div>
  );
};

export default PageLayout;
