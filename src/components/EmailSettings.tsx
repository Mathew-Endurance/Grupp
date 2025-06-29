import { Mail } from "lucide-react";
import React from "react";

const EmailSettings: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row space-x-16 bg-white rounded-lg p-4 md:p-6 border-b border-gray-200">
      <div className=" mb-4 md:mb-0">
        <h3 className="text-sm font-medium text-gray-900 mb-1">
          Connected email
        </h3>
        <p className="text-sm text-gray-500">Select role account</p>
      </div>

      <div className=" space-y-4">
        {/* My account email option */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name="email"
            className="mt-0.5 h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
            defaultChecked
          />
          <div>
            <div className="text-sm font-medium text-gray-900">
              My account email
            </div>
            <div className="text-sm text-gray-500">olivia@untitledui.com</div>
          </div>
        </label>

        {/* An alternative email option */}
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="radio"
            name="email"
            className="mt-0.5 h-4 w-4 text-purple-600 border-gray-300 focus:ring-purple-500"
          />
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 mb-3">
              An alternative email
            </div>
            <div className="flex md:w-100 gap-2 items-center bg-gray-50 border border-gray-300 rounded-md px-3 py-2">
              <Mail size={16} className="text-gray-600" />
              <span className="text-sm text-gray-700 ">
                billing@untitledui.com
              </span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default EmailSettings;
