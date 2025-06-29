import type { SettingsHeaderProps } from "@/types/settings";
import React from "react";

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-base md:text-2xl font-semibold mb-1 md:mb-2">
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  );
};

export default SettingsHeader;
