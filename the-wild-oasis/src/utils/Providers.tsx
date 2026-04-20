import GlobalStyle from "@/styles/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { type ReactNode } from "react";
import { DarkModeProvider, useDarkMode } from "@/contexts/DarkModeContext";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DarkModeProvider>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </DarkModeProvider>
    </QueryClientProvider>
  );
}

function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  const { theme } = useDarkMode();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ReactQueryDevtools />
      {children}
      <ToastContainer />
    </ThemeProvider>
  );
}

export default Providers;
