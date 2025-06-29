import React, { useState, useCallback, memo } from "react";
import { Plus, User, X, Upload, Check } from "lucide-react";
import type { Role } from "../../types/settings";

interface ActiveRoleProps {
  roles: Role[];
  activeRole: string;
  onRoleSelection: (roleName: string) => void;
}

// Memoized role avatar component to prevent re-renders
const RoleAvatar = memo(({ role }: { role: Role }) => {
  if (role.users && role.users.length > 0) {
    return (
      <img
        src={role.users[0]}
        alt={role.name}
        className="w-10 h-10 rounded-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
      <User size={20} className="text-gray-600" />
    </div>
  );
});

RoleAvatar.displayName = "RoleAvatar";

const ActiveRole: React.FC<ActiveRoleProps> = ({
  roles,
  activeRole,
  onRoleSelection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRole, setNewRole] = useState({
    name: "",
    type: "admin",
    image: null as File | null,
  });

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setNewRole((prev) => ({ ...prev, image: file }));
      }
    },
    []
  );

  const handleSubmit = useCallback(() => {
    console.log("New role:", newRole);
    setIsModalOpen(false);
    setNewRole({ name: "", type: "admin", image: null });
  }, [newRole]);

  const handleSetAsDefault = useCallback(
    (roleName: string, e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("Set as default:", roleName);
    },
    []
  );

  const handleEditClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const RoleItem = useCallback(
    ({ role }: { role: Role }) => {
      const isSelected = activeRole === role.name;

      return (
        <div
          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer ${
            isSelected
              ? "border-purple-200 bg-purple-50"
              : "border-gray-200 hover:border-gray-300"
          }`}
          onClick={() => onRoleSelection(role.name)}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <RoleAvatar role={role} />
            </div>
            <div>
              <p className="font-medium text-gray-900">{role.name}</p>
              <p className="text-sm text-gray-500">
                Last active {role.date_created}
              </p>
              <div className="flex items-center space-x-3 mt-1">
                <button
                  onClick={(e) => handleSetAsDefault(role.name, e)}
                  className={`text-sm ${
                    isSelected
                      ? "text-purple-600 hover:text-purple-700"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Set as default
                </button>
                <button
                  onClick={handleEditClick}
                  className={`text-sm ${
                    isSelected
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
            {isSelected ? (
              <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
            ) : (
              <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
            )}
          </div>
        </div>
      );
    },
    [activeRole, handleEditClick, handleSetAsDefault, onRoleSelection]
  );

  return (
    <>
      <div className="flex flex-col md:flex-row bg-white rounded-lg p-4 md:p-6 border-b border-gray-200">
        <div className="w-full md:w-[30%] mb-4 md:mb-0">
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            Active Role
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Select active role available to the user.
          </p>
        </div>

        <div className="space-y-4 w-full md:w-[70%]">
          {roles.slice(0, 3).map((role) => (
            <RoleItem key={role.name} role={role} />
          ))}

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-6 flex items-center text-gray-600 hover:text-gray-700"
          >
            <Plus size={16} className="mr-2" />
            Add role to user
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Add New Role
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="roleName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role Name
                </label>
                <input
                  type="text"
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) =>
                    setNewRole((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>

              <div>
                <label
                  htmlFor="roleType"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Role Type
                </label>
                <select
                  id="roleType"
                  value={newRole.type}
                  onChange={(e) =>
                    setNewRole((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Superadmin</option>
                  <option value="developer">Developer</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="roleImage"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Profile Image
                </label>
                <div className="flex items-center space-x-4">
                  {newRole.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={URL.createObjectURL(newRole.image)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-gray-600" />
                    </div>
                  )}
                  <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Upload size={16} className="mr-2" />
                    Upload Image
                    <input
                      type="file"
                      id="roleImage"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                >
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveRole;
