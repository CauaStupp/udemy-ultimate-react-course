import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "@/features/authentication/UserAvatar";

const StyledHeader = styled.header`
  background-color: ${(props) => props.theme.colors.grey[0]};
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 812px) {
    width: 100%;
    padding: 1.2rem 2rem 1.2rem 7rem;
  }
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
