import type { ThemeType } from "./lightTheme";

export const darkTheme: ThemeType = {
  colors: {
    brand: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
    },
    grey: {
      0: "#18212f",
      50: "#111827",
      100: "#1f2937",
      200: "#374151",
      300: "#4b5563",
      400: "#6b7280",
      500: "#9ca3af",
      600: "#d1d5db",
      700: "#e5e7eb",
      800: "#f3f4f6",
      900: "#f9fafb",
    },
    blue: { 100: "#075985", 700: "#e0f2fe" },
    green: { 100: "#166534", 700: "#dcfce7" },
    yellow: { 100: "#854d0e", 700: "#fef9c3" },
    silver: { 100: "#374151", 700: "#f3f4f6" },
    red: { 100: "#fee2e2", 700: "#b91c1c", 800: "#991b1b" },
    backdrop: "rgba(0, 0, 0, 0.3)",
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.4)",
    md: "0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3)",
    lg: "0 2.4rem 3.2rem rgba(0, 0, 0, 0.4)",
  },
  borderRadius: {
    tiny: "3px",
    sm: "5px",
    md: "7px",
    lg: "9px",
  },
  image: {
    grayscale: "10%",
    opacity: "90%",
  },
};
