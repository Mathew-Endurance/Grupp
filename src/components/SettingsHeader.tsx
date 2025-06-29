import React from "react";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2">
        {title}
      </h1>
      <p className="text-sm md:text-base text-gray-600">{description}</p>
    </div>
  );
};

export default SettingsHeader;
