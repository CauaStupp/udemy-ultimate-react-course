import Spinner from "@/ui/Spinner";
import { useUserLoggedQuery } from "@/features/authentication/useAuthQueries";
import { useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: ${(props) => props.theme.colors.grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUserLoggedQuery();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
