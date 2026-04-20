import styled from "styled-components";

const ButtonText = styled.button`
  color: ${(props) => props.theme.colors.brand[600]};
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};

  &:hover,
  &:active {
    color: ${(props) => props.theme.colors.brand[700]};
  }
`;

export default ButtonText;
