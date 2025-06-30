import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { Home, Settings } from "lucide-react";
import MobileMenu from "../MobileMenu";
import { render } from "../../test/test-utils";

vi.mock("../../route/routes", () => ({
  getRouteFromLabel: (label: string) => {
    const routes: Record<string, string> = {
      Home: "/",
      Dashboard: "/dashboard",
      Settings: "/settings",
    };
    return routes[label] || "/";
  },
}));

describe("MobileMenu", () => {
  const defaultProps = {
    isMobileMenuOpen: false,
    handleMobileMenuToggle: vi.fn(),
    sidebarItems: [
      { icon: Home, label: "Home", active: true },
      { icon: Settings, label: "Settings", active: false, count: 3 },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders mobile header with logo and toggle button", () => {
    render(<MobileMenu {...defaultProps} />);

    expect(screen.getByText("Untitled UI")).toBeInTheDocument();
    expect(screen.getByLabelText("Toggle mobile menu")).toBeInTheDocument();
  });

  it("toggle button calls handleMobileMenuToggle when clicked", async () => {
    const { user } = render(<MobileMenu {...defaultProps} />);

    await user.click(screen.getByLabelText("Toggle mobile menu"));
    expect(defaultProps.handleMobileMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("does not render menu overlay when closed", () => {
    render(<MobileMenu {...defaultProps} />);

    expect(screen.queryByLabelText("Close menu")).not.toBeInTheDocument();
    expect(screen.queryByText("Home")).not.toBeInTheDocument();
  });

  it("renders menu overlay with navigation items when open", () => {
    render(<MobileMenu {...defaultProps} isMobileMenuOpen={true} />);

    expect(screen.getByLabelText("Close menu")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // Count badge
  });

  it("close button in overlay calls handleMobileMenuToggle", async () => {
    const { user } = render(
      <MobileMenu {...defaultProps} isMobileMenuOpen={true} />
    );

    await user.click(screen.getByLabelText("Close menu"));
    expect(defaultProps.handleMobileMenuToggle).toHaveBeenCalledTimes(1);
  });

  it("clicking a navigation item calls handleMobileMenuToggle", async () => {
    const { user } = render(
      <MobileMenu {...defaultProps} isMobileMenuOpen={true} />
    );

    await user.click(screen.getByText("Home"));
    expect(defaultProps.handleMobileMenuToggle).toHaveBeenCalledTimes(1);
  });
});
