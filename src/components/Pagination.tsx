import React, { useState, type JSX } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PaginationProps } from "@/types/type";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems);
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const goToPage = (p: number) => {
    if (p >= 1 && p <= totalPages) {
      onPageChange(p);
      setInputPage(p.toString());
    }
  };

  const handleInput = () => {
    const p = parseInt(inputPage, 10);
    if (isNaN(p)) {
      setInputPage(currentPage.toString());
    } else {
      goToPage(p);
    }
  };

  const Button = ({
    label,
    icon,
    disabled,
    page,
  }: {
    label: string;
    icon: JSX.Element;
    disabled: boolean;
    page: number;
  }) => (
    <button
      onClick={() => goToPage(page)}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex items-center rounded-md border text-sm font-medium transition px-4 py-2 sm:p-2 ${
        disabled
          ? "text-gray-300 border-gray-300 cursor-not-allowed"
          : "text-gray-700 border-gray-300 hover:bg-purple-100"
      }`}
    >
      <span className="sm:hidden">{label}</span>
      <span className="hidden sm:block">{icon}</span>
    </button>
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-700 text-center sm:text-left">
          Showing <span className="font-medium">{start}</span> to{" "}
          <span className="font-medium">{end}</span> of{" "}
          <span className="font-medium">{totalItems}</span> results
        </p>
        <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-2">
          <Button
            label="Previous"
            icon={<ChevronLeft size={16} />}
            disabled={currentPage === 1}
            page={currentPage - 1}
          />
          <div className="hidden sm:flex items-center">
            <span className="text-sm text-gray-700 mr-2">Page</span>
            <input
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={handleInput}
              onKeyDown={(e) => e.key === "Enter" && handleInput()}
              aria-label="Page number"
              className="w-12 h-8 rounded-md border text-center text-sm border-gray-300 focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700 ml-2">of {totalPages}</span>
          </div>
          <Button
            label="Next"
            icon={<ChevronRight size={16} />}
            disabled={currentPage === totalPages}
            page={currentPage + 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
