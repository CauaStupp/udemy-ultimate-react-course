import styled from "styled-components";
import LightLogo from "@/assets/logo-light.png";
import DarkLogo from "@/assets/logo-dark.png";
import { useDarkMode } from "@/contexts/DarkModeContext";

const StyledLogo = styled.div.attrs<{ $isOpen?: boolean }>((props) => ({
  $isOpen: props.$isOpen || false,
}))`
  text-align: center;

  @media (max-width: 812px) {
    margin-top: 10rem;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  }
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo({ isOpen }: { isOpen?: boolean }) {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo $isOpen={isOpen}>
      <Img src={isDarkMode ? DarkLogo : LightLogo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
