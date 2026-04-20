import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import { Heading } from "@/ui/Heading";
import Button from "@/ui/Button";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: ${(props) => props.theme.colors.grey[50]};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  /* box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading>The page you are looking for could not be found 😢</Heading>
        <Button onClick={moveBack} $size="large">
          &larr; Go back
        </Button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
