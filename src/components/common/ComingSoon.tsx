import React from "react";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-purple-50 p-6 rounded-full mb-6">
        <Construction size={48} className="text-purple-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
      {description && (
        <p className="text-gray-600 text-center max-w-md mb-8">{description}</p>
      )}
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse delay-300"></div>
        </div>
        <p className="text-center text-gray-600">
          We're working hard to bring you this feature soon!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;
