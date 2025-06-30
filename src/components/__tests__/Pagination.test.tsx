import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";

import Pagination from "../Pagination";
import { render } from "../../test/test-utils";

describe("Pagination", () => {
  const defaultProps = {
    totalItems: 100,
    itemsPerPage: 10,
    currentPage: 3,
    onPageChange: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders showing items text correctly", () => {
    render(<Pagination {...defaultProps} />);

    const resultsText = screen.getByText(/showing/i);
    expect(resultsText).toBeInTheDocument();
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText(/results$/i)).toBeInTheDocument();
  });

  it("renders previous and next buttons", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();
  });

  it("renders page input with correct value", () => {
    render(<Pagination {...defaultProps} />);

    const input = screen.getByLabelText("Page number");
    expect(input).toHaveValue("3");
    expect(screen.getByText(/of 10/)).toBeInTheDocument();
  });

  it("clicking previous button calls onPageChange with correct page", async () => {
    const { user } = render(<Pagination {...defaultProps} />);

    await user.click(screen.getByLabelText("Previous"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  it("clicking next button calls onPageChange with correct page", async () => {
    const { user } = render(<Pagination {...defaultProps} />);

    await user.click(screen.getByLabelText("Next"));
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  it("entering page number and blurring calls onPageChange", async () => {
    const { user } = render(<Pagination {...defaultProps} />);

    const input = screen.getByLabelText("Page number");
    await user.clear(input);
    await user.type(input, "7");
    await user.tab(); // Move focus away

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(7);
  });

  it("entering page number and pressing Enter calls onPageChange", async () => {
    const { user } = render(<Pagination {...defaultProps} />);

    const input = screen.getByLabelText("Page number");
    await user.clear(input);
    await user.type(input, "5{Enter}");

    expect(defaultProps.onPageChange).toHaveBeenCalledWith(5);
  });

  it("disables previous button on first page", () => {
    render(<Pagination {...defaultProps} currentPage={1} />);

    expect(screen.getByLabelText("Previous")).toBeDisabled();
    expect(screen.getByLabelText("Next")).not.toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(<Pagination {...defaultProps} currentPage={10} />);

    expect(screen.getByLabelText("Previous")).not.toBeDisabled();
    expect(screen.getByLabelText("Next")).toBeDisabled();
  });
});
