import React from "react";
import { Check, Plus, User } from "lucide-react";
import type { ActiveRoleProps, Role } from "../types/settings";

const ActiveRole: React.FC<ActiveRoleProps> = ({
  roles,
  activeRole,
  onRoleSelection,
}) => {
  return (
    <div className="bg-white rounded-lg   flex flex-col md:flex-row space-x-16">
      <div className="">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Active Role</h3>
        <p className="text-sm text-gray-600 mb-4">
          Select active role available to the user.
        </p>
      </div>

      <div className="space-y-3 flex-1">
        {roles.slice(0, 3).map((role: Role) => (
          <div
            key={role.name}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              activeRole === role.name
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => onRoleSelection(role.name)}
          >
            <div className="flex items-center space-x-3">
              {role.users && role.users.length > 0 ? (
                <img
                  src={role.users[0]}
                  alt={role.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-gray-600" />
                </div>
              )}
              <div>
                <p className="font-medium">{role.name}</p>
                <p className="text-sm text-gray-500">
                  Last active {role.date_created}
                </p>
                <div className="flex items-center space-x-3 mt-1">
                  <button
                    onClick={() => onRoleSelection(role.name)}
                    className={`text-sm ${
                      activeRole === role.name
                        ? "text-purple-600 hover:text-purple-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Set as default
                  </button>
                  <button
                    onClick={() => onRoleSelection(role.name)}
                    className={`text-sm ${
                      activeRole === role.name
                        ? "text-purple-600 hover:text-purple-700"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {activeRole === role.name ? (
                <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <Check size={18} className="text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
              )}
            </div>
          </div>
        ))}

        <button className="mt-4 flex items-center text-grey-300 hover:text-purple-700">
          <Plus size={16} className="mr-1" />
          Add role to user
        </button>
      </div>
    </div>
  );
};

export default ActiveRole;
