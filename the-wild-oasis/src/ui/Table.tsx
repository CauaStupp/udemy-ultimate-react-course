import { useMyContext } from "@/hooks/useMyContext";
import { createContext, type JSX, type ReactNode } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey[200]};

  font-size: 1.4rem;
  background-color: ${(props) => props.theme.colors.grey[0]};
  border-radius: 7px;
  overflow: hidden;
  width: 100%;
`;

const CommonRow = styled.div<{ $columns?: string }>`
  display: grid;
  grid-template-columns: ${(props) => props.$columns || "repeat(3, 2fr)"};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
  width: 100%;
`;

const StyledHeader = styled(CommonRow).attrs({ as: "header" })`
  padding: 1.6rem 2.4rem;

  background-color: ${(props) => props.theme.colors.grey[50]};
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  width: 100%;
  color: ${(props) => props.theme.colors.grey[600]};
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  width: 100%;
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.grey[100]};
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
  width: 100%;
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.colors.grey[50]};
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  width: 100%;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

type TableProps = {
  columns: string;
  children: ReactNode;
};

type TableContextType = {
  columns: string;
};

const TableContext = createContext<TableContextType | null>(null);

function Table({ columns, children }: TableProps) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: ReactNode }) {
  const { columns } = useMyContext(TableContext);

  return (
    <StyledHeader role="row" $columns={columns}>
      {children}
    </StyledHeader>
  );
}

function Row({ children }: { children: ReactNode }) {
  const { columns } = useMyContext(TableContext);

  return (
    <StyledRow role="row" $columns={columns}>
      {children}
    </StyledRow>
  );
}

type BodyProps<T> = {
  items: T[];
  render: (item: T) => ReactNode;
};

function Body<T>({ items, render }: BodyProps<T>) {
  if (!items || items.length === 0)
    return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{items.map((item) => render(item))}</StyledBody>;
}

type TableComponent = ((props: TableProps) => JSX.Element) & {
  Header: typeof Header;
  Row: typeof Row;
  Body: <T>(props: BodyProps<T>) => JSX.Element;
  Footer: typeof Footer;
};

const TableExport = Table as TableComponent;
TableExport.Header = Header;
TableExport.Row = Row;
TableExport.Body = Body;
TableExport.Footer = Footer;

export default TableExport;
