import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@/types/settings";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const [inputPage, setInputPage] = useState<string>(currentPage.toString());
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
      setInputPage(page.toString());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputBlur = () => {
    const page = parseInt(inputPage, 10);
    if (!isNaN(page)) goToPage(page);
    else setInputPage(currentPage.toString());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleInputBlur();
  };

  const baseBtn =
    "inline-flex items-center rounded-md border border-gray-300 text-sm font-medium";
  const actionBtn = (disabled: boolean) =>
    `${baseBtn} px-4 py-2 ${
      disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-700 hover:bg-purple-100"
    }`;
  const iconBtn = (disabled: boolean) =>
    `inline-flex items-center rounded-md p-2 ${
      disabled
        ? "text-gray-300 cursor-not-allowed"
        : "text-gray-500 hover:bg-purple-100"
    }`;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      {/* Unified controls */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Range Text */}
        <p className="text-sm text-gray-700 text-center sm:text-left">
          Showing{" "}
          <span className="font-medium">
            {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of <span className="font-medium">{totalItems}</span> results
        </p>

        <div className="flex justify-between w-full sm:hidden">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`sm:hidden ${actionBtn(currentPage === 1)}`}
          >
            Previous
          </button>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`sm:hidden ${actionBtn(currentPage === totalPages)}`}
          >
            Next
          </button>
        </div>

        <div className="flex  space-x-2">
          {/* Icon Buttons for Desktop */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`hidden sm:inline-flex ${iconBtn(currentPage === 1)}`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} className="hidden md:block" />
          </button>

          <div className="hidden sm:flex items-center">
            <span className="text-sm text-gray-700 mr-2">Page</span>
            <input
              type="text"
              value={inputPage}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onKeyDown={handleKeyDown}
              className="w-12 h-8 rounded-md border border-gray-300 text-center text-sm"
              aria-label="Go to page"
            />
            <span className="text-sm text-gray-700 ml-2">of {totalPages}</span>
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`hidden sm:inline-flex ${iconBtn(
              currentPage === totalPages
            )}`}
            aria-label="Next page"
          >
            <ChevronRight size={16} className="hidden md:block" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
