import { CitiesContextProvider } from "@/contexts/citiesContext";
import { UserContextProvider } from "@/contexts/userContext";
import { type ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <UserContextProvider>
      <CitiesContextProvider>{children}</CitiesContextProvider>
    </UserContextProvider>
  );
}
