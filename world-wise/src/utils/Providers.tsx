import { UserContextProvider } from "@/contexts/userContext";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <UserContextProvider>{children}</UserContextProvider>;
}
