import styled from "styled-components";

const ButtonIcon = styled.button`
  background: none;
  border: none;
  padding: 0.6rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }

  &:disabled {
    opacity: 0.7;
    cursor: progress;
  }

  &:focus {
    outline: none;
    border: none;
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: ${(props) => props.theme.colors.brand[600]};
  }
`;

export default ButtonIcon;
