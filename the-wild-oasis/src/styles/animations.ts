import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: initial;
    transform: initial;
  }
`;

export const FadeIn = styled.div`
  animation: ${fadeIn} 0.4s linear;
  display: flex;
  gap: 1.5rem;
  width: 100%;
  flex-direction: column;
`;
