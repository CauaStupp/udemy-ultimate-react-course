import type { SelectHTMLAttributes } from "react";
import styled from "styled-components";

const StyledSelect = styled.select<{ $color?: string }>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$color === "white"
        ? props.theme.colors.grey[100]
        : props.theme.colors.grey[300]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  background-color: ${(props) => props.theme.colors.grey[0]};
  font-weight: 500;
  box-shadow: ${(props) => props.theme.shadows.sm};
`;

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: {
    value: string;
    label: string;
  }[];
  value: string;
  $color?: string;
}

function Select({ options, value, $color, ...props }: SelectProps) {
  return (
    <StyledSelect value={value} $color={$color} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
