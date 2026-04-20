import styled from "styled-components";

const Input = styled.input`
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) => props.theme.colors.grey[300]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: ${(props) => props.theme.colors.grey[0]};
  box-shadow: ${(props) => props.theme.shadows.sm};
  width: 100%;
  resize: none;
`;

export default Input;
