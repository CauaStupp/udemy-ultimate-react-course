import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SpinnerMini = styled(BiLoaderAlt)`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;

  animation: ${rotate} 1.5s infinite linear;
`;

export default SpinnerMini;
