import { useUserContext } from "@/contexts/userContext";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useUserContext();

  return user ? children : <Navigate to="/login" />;
}
