import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: ${(props) => props.theme.borderRadius.sm};
    border: none;
    color: ${(props) => props.theme.colors.brand[50]};
    background-color: ${(props) => props.theme.colors.brand[600]};
    cursor: pointer;
    transition:
      color 0.2s,
      background-color 0.2s;

    &:hover {
      background-color: ${(props) => props.theme.colors.brand[700]};
    }
  }
`;

export default FileInput;
