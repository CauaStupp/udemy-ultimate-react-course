import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useState } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
// import Uploader from "@/data/Uploader";

const StyledSidebar = styled.aside.attrs<{ $isOpen: boolean }>((props) => ({
  $isOpen: props.$isOpen || false,
}))`
  background-color: ${(props) => props.theme.colors.grey[0]};
  padding: 3.2rem 2.4rem;
  border-right: 1px solid ${(props) => props.theme.colors.grey[100]};
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 812px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    align-items: center;
    padding: 0;
    z-index: 100;
    width: ${(props) => (props.$isOpen ? "26rem" : "50px")};
    overflow-x: hidden;
    transition: 0.2s all;
  }
`;

const ButtonMobile = styled.button`
  position: absolute;
  top: 15px;
  width: max-content;
  height: max-content;
  padding: 0.8rem;
  color: ${(props) => props.theme.colors.grey[900]};
  display: none;
  background-color: ${(props) => props.theme.colors.grey[200]};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.sm};

  &:svg > {
    width: 4rem;
    height: 4rem;
  }

  &:focus {
    border: none;
    outline: none;
  }

  @media (max-width: 812px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo isOpen={isOpen} />
      <ButtonMobile onClick={() => setIsOpen((state) => !state)}>
        <HiOutlineBars3 />
      </ButtonMobile>
      <MainNav isOpen={isOpen} />

      {/* <Uploader /> */}
    </StyledSidebar>
  );
}

export default Sidebar;
