import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-semibold mb-1 md:mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-lg md:text-2xl text-gray-600">{description}</p>
      )}
    </div>
  );
};

export default PageHeader;
