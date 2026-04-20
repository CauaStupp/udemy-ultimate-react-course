import { userLogged } from "@/services/apiAuth";
import { useQuery } from "@tanstack/react-query";

export function useUserLoggedQuery() {
  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: userLogged,
  });

  return {
    user: data,
    isAuthenticated: data?.role === "authenticated",
    isLoading,
  };
}
