import type { PropsWithChildren } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: ${(props) => props.theme.colors.red[700]};
`;

interface FormRowVerticalProps extends PropsWithChildren {
  error?: string;
  label?: string;
  id?: string;
}

function FormRowVertical({ label, error, id, children }: FormRowVerticalProps) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
