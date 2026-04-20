import { NavLink } from "react-router";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";
import { HiOutlineDeviceMobile } from "react-icons/hi";

const StyledNav = styled.nav`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  list-style: none;
  @media (max-width: 812px) {
    display: none;
  }
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;

  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: ${(props) => props.theme.colors.grey[600]};
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: ${(props) => props.theme.colors.grey[800]};
    background-color: ${(props) => props.theme.colors.grey[50]};
    border-radius: ${(props) => props.theme.borderRadius.sm};
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${(props) => props.theme.colors.grey[400]};
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: ${(props) => props.theme.colors.brand[600]};
  }

  @media (max-width: 812px) {
    display: none;
  }
`;

const ButtonMobile = styled.button`
  width: max-content;
  height: max-content;
  color: ${(props) => props.theme.colors.grey[900]};
  display: none;

  &:svg > {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 812px) {
    display: block;
  }
`;

function MainNav() {
  return (
    <StyledNav>
      <ButtonMobile>
        <HiOutlineDeviceMobile />
      </ButtonMobile>
      <NavList>
        <li>
          <StyledLink to="dashboard">
            <HiOutlineHome />
            Home
          </StyledLink>
        </li>
        <li>
          <StyledLink to="bookings">
            <HiOutlineCalendarDays /> Bookings
          </StyledLink>
        </li>
        <li>
          <StyledLink to="cabins">
            <HiOutlineHomeModern /> Cabins
          </StyledLink>
        </li>
        <li>
          <StyledLink to="users">
            <HiOutlineUsers /> User
          </StyledLink>
        </li>
        <li>
          <StyledLink to="settings">
            <HiOutlineCog6Tooth /> Settings
          </StyledLink>
        </li>
      </NavList>
    </StyledNav>
  );
}

export default MainNav;
