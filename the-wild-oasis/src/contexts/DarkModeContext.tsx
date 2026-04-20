import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { lightTheme } from "@/themes/lightTheme";
import { darkTheme } from "@/themes/darkTheme";
import type { ThemeType } from "@/themes/lightTheme";

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: ThemeType;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState<boolean>(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "theme",
  );

  const toggleTheme = () => setIsDarkMode((isDark: boolean) => !isDark);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("useDarkMode deve ser usado dentro de um DarkModeProvider");
  }
  return context;
}
