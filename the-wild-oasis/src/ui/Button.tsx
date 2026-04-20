import styled, { css } from "styled-components";

const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `,
};

const variations = {
  primary: css`
    color: ${(props) => props.theme.colors.brand[50]};
    background-color: ${(props) => props.theme.colors.brand[600]};

    &:hover {
      background-color: ${(props) => props.theme.colors.brand[700]};
    }
  `,
  secondary: css`
    color: ${(props) => props.theme.colors.grey[600]};
    background: ${(props) => props.theme.colors.grey[0]};
    border: 1px solid ${(props) => props.theme.colors.grey[200]};

    &:hover {
      background-color: ${(props) => props.theme.colors.grey[50]};
    }
  `,
  danger: css`
    color: ${(props) => props.theme.colors.red[100]};
    background-color: ${(props) => props.theme.colors.red[700]};

    &:hover {
      background-color: ${(props) => props.theme.colors.red[800]};
    }
  `,
};

const Button = styled.button<{
  $variation?: "primary" | "secondary" | "danger";
  $size?: "small" | "medium" | "large";
}>`
  border-radius: ${(props) => props.theme.borderRadius.sm};
  box-shadow: ${(props) => props.theme.shadows.sm};
  border: none;

  ${(props) => sizes[props.$size || "medium"]}
  ${(props) => variations[props.$variation || "primary"]}

  &:disabled {
    opacity: 0.7;
  }
`;

export default Button;
