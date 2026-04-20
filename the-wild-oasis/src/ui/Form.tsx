import styled, { css } from "styled-components";

const Form = styled.form.attrs<{ $type?: "modal" | "normal" }>((props) => ({
  $type: props.$type || "normal",
}))`
  ${(props) =>
    props.$type !== "modal" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: ${(props) => props.theme.colors.grey[0]};
      border: 1px solid ${(props) => props.theme.colors.grey[100]};
      border-radius: ${(props) => props.theme.borderRadius.md};
      width: 100%;
    `}

  ${(props) =>
    props.$type === "modal" &&
    css`
      max-width: 80rem;
      width: 100%;
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

export default Form;
