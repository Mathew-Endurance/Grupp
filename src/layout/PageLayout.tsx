import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MobileMenu from "./MobileMenu";
import MobileFooter from "./MobileFooter";
import { sidebarItems } from "../data";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
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

      <div className="flex w-full">
        {/* Desktop Sidebar - hidden on mobile */}
        <div className="hidden lg:block">
          <Sidebar sidebarItems={sidebarItems} />
        </div>

        {/* Main Content */}
        <div className="flex-1 w-full">
          <div className="p-4 lg:p-8">{children}</div>
        </div>
      </div>

      {/* Mobile Footer Navigation */}
      <MobileFooter />
    </div>
  );
};

export default PageLayout;
