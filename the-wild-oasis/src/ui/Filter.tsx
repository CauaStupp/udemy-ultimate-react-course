import { useSearchParams } from "react-router";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  background-color: ${(props) => props.theme.colors.grey[0]};
  box-shadow: ${(props) => props.theme.shadows.sm};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: ${(props) => props.theme.colors.brand[600]};
      color: ${(props) => props.theme.colors.brand[50]};
    `}

  border-radius: ${(props) => props.theme.borderRadius.sm};
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.brand[600]};
    color: ${(props) => props.theme.colors.brand[50]};
  }
`;

type FilterProps = {
  filterName: string;
  options: {
    value: string;
    label: string;
  }[];
};

function Filter({ filterName, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterName) || options[0].value;

  function handleClick(value: string) {
    searchParams.set(filterName, value);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
