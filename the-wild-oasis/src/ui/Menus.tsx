import { useCloseModal } from "@/hooks/useCloseModal";
import { useMyContext } from "@/hooks/useMyContext";
import {
  createContext,
  useState,
  type ButtonHTMLAttributes,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transform: translateX(0.8rem);
  transition: all 0.2s;
  height: max-content;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: ${(props) => props.theme.colors.grey[700]};
  }
`;

const StyledList = styled.ul<{ $position: { x: number; y: number } }>`
  position: fixed;

  background-color: ${(props) => props.theme.colors.grey[0]};
  box-shadow: ${(props) => props.theme.shadows.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  list-style: none;

  right: ${(props) => props.$position.x}px;
  top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:focus {
    outline: none;
  }

  li:first-child & {
    border-top-right-radius: ${(props) => props.theme.borderRadius.md};
    border-top-left-radius: ${(props) => props.theme.borderRadius.md};
  }

  li:last-child & {
    border-bottom-right-radius: ${(props) => props.theme.borderRadius.md};
    border-bottom-left-radius: ${(props) => props.theme.borderRadius.md};
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: ${(props) => props.theme.colors.grey[400]};
    transition: all 0.3s;
  }
`;

type Position = { x: number; y: number } | null;

type MenusContextType = {
  openId: number;
  close: () => void;
  open: (id: number) => void;
  position: Position;
  setPosition: Dispatch<SetStateAction<Position>>;
};

const MenusContext = createContext<MenusContextType | null>(null);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState(0);
  const [position, setPosition] = useState<Position>(null);

  const close = () => setOpenId(0);
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function List({ children, id }: { children: ReactNode; id: number }) {
  const { openId, position, close } = useMyContext(MenusContext);
  const ref = useCloseModal<HTMLUListElement>(close, false);

  if (openId !== id || !position) return null;
  return createPortal(
    <StyledList $position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body,
  );
}

function Toggle({ id }: { id: number }) {
  const { openId, close, open, setPosition } = useMyContext(MenusContext);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();

    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    if (rect) {
      setPosition({
        x: window.innerWidth - rect.width - rect.x,
        y: rect.y + rect.height + 8, // 8px de respiro
      });
    }

    if (openId === 0 || openId !== id) {
      open(id);
    } else if (openId === id) {
      close();
    } else {
      close;
    }
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Button({
  children,
  onClick,
  ...props
}: {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { close } = useMyContext(MenusContext);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(e);
    close();
  }

  return (
    <li>
      <StyledButton {...props} onClick={handleClick}>
        {children}
      </StyledButton>
    </li>
  );
}

Menus.Menu = Menu;
Menus.List = List;
Menus.Toggle = Toggle;
Menus.Button = Button;

export default Menus;
