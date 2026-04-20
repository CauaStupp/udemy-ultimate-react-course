import { useCloseModal } from "@/hooks/useCloseModal";
import {
  cloneElement,
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.grey[0]};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  box-shadow: ${(props) => props.theme.shadows.lg};
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.backdrop};
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;
  width: max-content;
  height: max-content;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[100]};
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: ${(props) => props.theme.colors.grey[500]};
  }
`;

type ModalContextType = {
  openName: string;
  close(): void;
  open: Dispatch<SetStateAction<string>>;
};

const ModalContext = createContext<ModalContextType | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("Modal context not defined");
  return context;
}

function Modal({ children }: { children: ReactNode }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, name }: { children: ReactNode; name: string }) {
  const { openName, close } = useModalContext();
  const ref = useCloseModal<HTMLDivElement>(close);

  if (name !== openName) return null;
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>
          {cloneElement(
            children as React.ReactElement<{ onCloseModal: () => void }>,
            { onCloseModal: close },
          )}
        </div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

function Open({
  children,
  opensWindowName,
}: {
  children: ReactNode;
  opensWindowName: string;
}) {
  const { open } = useModalContext();

  return cloneElement(children as React.ReactElement<{ onClick: () => void }>, {
    onClick: () => open(opensWindowName),
  });
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
