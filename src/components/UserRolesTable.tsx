import React, { useState, useMemo } from "react";
import { CloudDownload, Check, Users } from "lucide-react";
import type { Role } from "../types/settings";
import { classNames } from "../utils/styles";
import Pagination from "./Pagination";
import { tableHeaders } from "../data";

interface StatusDisplay {
  color: string;
  icon: React.ReactNode;
}

// Status styling helper function
const getStatusColor = (status: Role["status"]): StatusDisplay => {
  switch (status) {
    case "Active":
      return {
        color: "bg-green-100 text-green-800",
        icon: <Check size={14} className="mr-1" />,
      };
    case "Inactive":
      return {
        color: "bg-orange-100 text-orange-800",
        icon: null,
      };
    default:
      return {
        color: "bg-gray-100 text-gray-800",
        icon: null,
      };
  }
};

interface UserRolesTableProps {
  roles: Role[];
  loading: boolean;
  generateAvatars: (images: string[] | undefined) => React.ReactNode[];
}

const ITEMS_PER_PAGE = 10;

const UserRolesTable: React.FC<UserRolesTableProps> = ({
  roles,
  loading,
  generateAvatars,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  // Calculate paginated data
  const paginatedRoles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return roles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [roles, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowSelect = (index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

  // Render avatar group with count
  const renderAvatarGroup = (role: Role, size: "sm" | "md" = "md") => {
    const totalUsers = role.users?.length || role.role_users?.length || 0;
    const avatars = generateAvatars(role.users);
    const hasMoreUsers = totalUsers > 4;
    const moreCount = totalUsers - 4;

    if (totalUsers === 0) {
      return (
        <div className="flex items-center">
          <div
            className={`bg-gray-200 rounded-full ${
              size === "sm" ? "w-8 h-8" : "w-10 h-10"
            } flex items-center justify-center`}
          >
            <Users size={size === "sm" ? 14 : 16} className="text-gray-500" />
          </div>
          <span className="ml-2 text-xs text-gray-500">No users</span>
        </div>
      );
    }

    return (
      <div className="flex items-center">
        <div className="flex -space-x-1">{avatars}</div>
        {hasMoreUsers && (
          <span
            className={`text-sm text-gray-700 bg-gray-50 rounded-full ${
              size === "sm" ? "w-8 h-8" : "w-10 h-10"
            } -ml-2 border-2 border-white flex items-center justify-center`}
          >
            +{moreCount}
          </span>
        )}
      </div>
    );
  };

  // Mobile view shows only Name and Date Created columns
  const mobileHeaders = ["", "Name", "Date Created"];

  return (
    <div className="bg-white rounded-lg">
      <div className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">User Roles</h3>

          <button className="flex items-center text-gray-600 hover:text-gray-700 border border-gray-400 rounded-md px-3 py-1 text-sm w-fit md:w-auto">
            <CloudDownload size={16} className="mr-1" />
            <span>Download all</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center">Loading roles...</div>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg border-gray-200">
            {/* Desktop Table - Hidden on Mobile */}
            <table className="w-full hidden md:table">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  {tableHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRoles.map((role: Role, index: number) => (
                  <tr key={index} className="hover:bg-gray-50">
                    {/* checkbox */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-purple-600"
                      />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium">{role.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm">{role.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {role.date_created}
                    </td>

                    {/* user status  */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={classNames(
                          "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full",
                          getStatusColor(role.status).color
                        )}
                      >
                        {getStatusColor(role.status).icon}
                        {role.status}
                      </span>
                    </td>

                    {/* role users */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex -space-x-1">
                          {generateAvatars(role.users)}
                        </div>
                        {(role.users?.length || role.role_users?.length || 0) >
                          4 && (
                          <span className="text-sm text-gray-700 bg-gray-50 rounded-full w-10 h-10 -ml-2 border-2 border-white flex items-center justify-center">
                            +
                            {(role.users?.length ||
                              role.role_users?.length ||
                              0) - 4}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* actions */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        aria-label={`More actions for ${role.name}`}
                      >
                        <CloudDownload size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile Table */}
            <table className="w-full md:hidden text-xs md:text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {mobileHeaders.map((header) => (
                    <th
                      key={header}
                      className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRoles.map((role: Role, index: number) => (
                  <React.Fragment key={index}>
                    <tr
                      className={classNames(
                        "hover:bg-gray-50",
                        selectedRow === index ? "bg-gray-50" : ""
                      )}
                      onClick={() => handleRowSelect(index)}
                    >
                      {/* checkbox */}
                      <td className="px-3 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-purple-600"
                          checked={selectedRow === index}
                          onChange={() => handleRowSelect(index)}
                        />
                      </td>

                      <td className="px-3 py-4 whitespace-nowrap">
                        <span className="font-medium">{role.name}</span>
                      </td>
                      <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                        {role.date_created}
                      </td>
                    </tr>

                    {/* Expanded row details */}
                    {selectedRow === index && (
                      <tr className="bg-gray-50">
                        <td colSpan={3} className="px-3 py-4">
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-xs font-medium text-gray-500 uppercase">
                                Type
                              </span>
                              <span className="text-sm">{role.type}</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-500 uppercase">
                                Status
                              </span>
                              <span
                                className={classNames(
                                  "inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full",
                                  getStatusColor(role.status).color
                                )}
                              >
                                {getStatusColor(role.status).icon}
                                {role.status}
                              </span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-xs font-medium text-gray-500 uppercase">
                                Role users
                              </span>
                              {renderAvatarGroup(role, "sm")}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {roles.length > 0 && (
            <Pagination
              totalItems={roles.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserRolesTable;
