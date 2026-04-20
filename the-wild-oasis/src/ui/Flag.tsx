import styled from "styled-components";

export const Flag = styled.img`
  max-width: 2rem;
  border-radius: ${(props) => props.theme.borderRadius.tiny};
  display: block;
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
`;
