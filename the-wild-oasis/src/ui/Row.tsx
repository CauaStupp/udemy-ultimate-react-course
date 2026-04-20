import styled, { css } from "styled-components";

const Row = styled.div.attrs<{ $direction?: "row" | "column" }>((props) => ({
  type: "direction",
  $direction: props.$direction || "row",
}))`
  display: flex;
  gap: 1rem;
  width: 100%;
  ${(props) =>
    props.$direction === "row"
      ? css`
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          gap: 1rem;
          flex-wrap: wrap;
        `
      : css`
          flex-direction: column;
          gap: 1.6rem;
        `};
`;

export default Row;
