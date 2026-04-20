import styled from "styled-components";

export const Heading = styled.h1`
  font-size: 3rem;
  font-weight: 600;
  line-height: 1.4;
`;

export const HeadingH2 = styled(Heading).attrs({ as: "h2" })`
  font-size: 2rem;
  font-weight: 600;
`;

export const HeadingH3 = styled(Heading).attrs({ as: "h3" })`
  font-size: 2rem;
  font-weight: 500;
`;
