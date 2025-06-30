// Theme colors
export const COLORS = {
  primary: "purple",
  success: "green",
  error: "red",
  warning: "yellow",
  info: "blue",
};

export interface StatusStyle {
  color: string;
  bgColor: string;
  textColor: string;
}

export const getStatusStyles = (status: string): StatusStyle => {
  switch (status.toLowerCase()) {
    case "active":
      return {
        color: "green",
        bgColor: "bg-green-100",
        textColor: "text-green-800",
      };
    case "inactive":
      return {
        color: "red",
        bgColor: "bg-red-100",
        textColor: "text-red-800",
      };
    case "pending":
      return {
        color: "yellow",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-800",
      };
    default:
      return {
        color: "gray",
        bgColor: "bg-gray-100",
        textColor: "text-gray-800",
      };
  }
};

export const COMPONENT_STYLES = {
  button: {
    primary: "bg-purple-600 hover:bg-purple-700 text-w",
    secondary: "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  },

  activeState: {
    tab: "border-purple-500 text-purple-600",
    sidebar: "bg-purple-50 text-purple-600 border-l-4 border-purple-600",
    default: "text-purple-600",
  },

  input:
    "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent",

  card: "bg-white rounded-lg shadow",
};

export const classNames = (
  ...classes: (string | boolean | undefined)[]
): string => {
  return classes.filter(Boolean).join(" ");
};
