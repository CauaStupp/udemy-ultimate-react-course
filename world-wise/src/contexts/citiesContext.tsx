import { createContext, useContext, type ReactNode } from "react";

const CitiesContext = createContext(null);

export function CitiesContextProvider({ children }: { children: ReactNode }) {
  return (
    <CitiesContext.Provider value={null}>{children}</CitiesContext.Provider>
  );
}

export function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (!context) throw new Error("Error in CitiesContext");
  return context;
}
