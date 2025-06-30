import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import MobileFooter from "../MobileFooter";
import { render } from "../../test/test-utils";

describe("MobileFooter", () => {
  it("renders navigation items correctly", () => {
    render(<MobileFooter />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("highlights active item based on current route", () => {
    render(<MobileFooter />, { route: "/" });

    const homeText = screen.getByText("Home");
    expect(homeText).toHaveClass("text-purple-600");

    const settingsText = screen.getByText("Settings");
    expect(settingsText).not.toHaveClass("text-purple-600");
    expect(settingsText).toHaveClass("text-gray-500");
  });

  it("highlights settings when on settings route", () => {
    render(<MobileFooter />, { route: "/settings" });

    const homeText = screen.getByText("Home");
    expect(homeText).not.toHaveClass("text-purple-600");

    const settingsText = screen.getByText("Settings");
    expect(settingsText).toHaveClass("text-purple-600");
  });

  it("has proper navigation links", () => {
    render(<MobileFooter />);

    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveAttribute("href", "/");

    const settingsLink = screen.getByText("Settings").closest("a");
    expect(settingsLink).toHaveAttribute("href", "/settings");
  });

  it("renders with correct styling", () => {
    const { container } = render(<MobileFooter />);

    const footer = container.firstChild;
    expect(footer).toHaveClass("fixed");
    expect(footer).toHaveClass("bottom-0");
    expect(footer).toHaveClass("lg:hidden");
  });
});
