import styled from "styled-components";
import LightLogo from "@/assets/logo-light.png";
import DarkLogo from "@/assets/logo-dark.png";
import { useDarkMode } from "@/contexts/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledLogo>
      <Img src={isDarkMode ? DarkLogo : LightLogo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
