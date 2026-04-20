import styled from "styled-components";
import { Heading } from "./Heading";
import GlobalStyle from "@/styles/GlobalStyle";
import { getErrorMessage, type FallbackProps } from "react-error-boundary";
import Button from "./Button";

const StyledErrorFallback = styled.main`
  height: 40vh;
  background-color: ${(props) => props.theme.colors.grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  width: 100%;
`;

const Box = styled.div`
  /* Box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;
  width: 100%;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: ${(props) => props.theme.colors.grey[500]};
  }
`;

function ErrorBoundaryCustomized({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <>
      <GlobalStyle />
      <StyledErrorFallback>
        <Box>
          <Heading>Something went wrong</Heading>
          <p>{getErrorMessage(error)}</p>
          <Button onClick={resetErrorBoundary}>Retry</Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorBoundaryCustomized;
