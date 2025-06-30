import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Home, Settings } from "lucide-react";
import Sidebar from "../Sidebar";
import { render } from "../../test/test-utils";

vi.mock("../../route/routes", () => ({
  getRouteFromLabel: (label) => {
    const routes = {
      Home: "/",
      Dashboard: "/dashboard",
      Settings: "/settings",
    };
    return routes[label] || "/";
  },
}));

vi.mock("../../styles", () => ({
  classNames: (...classes) => classes.filter(Boolean).join(" "),
  COMPONENT_STYLES: {
    activeState: {
      sidebar: "bg-purple-50 text-purple-600 border-l-4 border-purple-600",
      default: "text-purple-600",
    },
  },
}));

describe("Sidebar", () => {
  const sidebarItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Settings, label: "Settings", active: false, count: 3 },
  ];

  it("renders sidebar with logo and search input", () => {
    render(<Sidebar sidebarItems={sidebarItems} />);

    expect(screen.getByText("Untitled UI")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Olivia Rhye")).toBeInTheDocument();
  });

  it("renders navigation items correctly", () => {
    render(<Sidebar sidebarItems={sidebarItems} />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
