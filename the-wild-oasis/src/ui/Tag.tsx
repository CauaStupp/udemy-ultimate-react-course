import styled from "styled-components";

const Tag = styled.span<{ $variation: string }>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;
  text-align: center;

  /* Make these dynamic, based on the received prop */
  color: ${(props) => {
    if (props.$variation === "blue") {
      return props.theme.colors.blue[700];
    } else if (props.$variation === "green") {
      return props.theme.colors.green[700];
    } else {
      return props.theme.colors.silver[700];
    }
  }};
  background-color: ${(props) => {
    if (props.$variation === "blue") {
      return props.theme.colors.blue[100];
    } else if (props.$variation === "green") {
      return props.theme.colors.green[100];
    } else {
      return props.theme.colors.silver[100];
    }
  }};
`;

export default Tag;
