import { type ReactNode } from "react";
import styles from "./styles.module.css";

interface ButtonProps extends Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "type"
> {
  children: ReactNode;
  type: "primary" | "secondary" | "position";
}

export function Button({ children, type, ...rest }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[type]}`} {...rest}>
      {children}
    </button>
  );
}
