import styled from "styled-components";

const DashboardBox = styled.div`
  /* Box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export default DashboardBox;
