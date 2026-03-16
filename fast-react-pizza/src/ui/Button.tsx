import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export type TypeButton =
  | "primary"
  | "secondary"
  | "small"
  | "secundarySmall"
  | "smallRounded";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  typeButton?: TypeButton;
  to?: string;
}

function Button({
  children,
  typeButton = "primary",
  to,
  ...props
}: ButtonProps) {
  const primaryBase =
    "bg-yellow-400 text-sm cursor-pointer uppercase font-semibold text-stone-800 tracking-wide inline-block rounded-full hover:bg-yellow-300 transition-colors focus:outline-none focus:ring focus:ring-offset-2 focus:ring-yellow-400 focus:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60";
  const secondaryBase =
    "border-2 text-sm border-red-400 cursor-pointer uppercase font-semibold text-red-800 tracking-wide inline-block rounded-full hover:bg-red-400 hover:text-stone-800 transition-colors focus:outline-none focus:ring focus:ring-offset-2 focus:text-stone-800 focus:border-red-300 focus:ring-red-300 focus:bg-red-300 disabled:cursor-not-allowed disabled:opacity-70";

  const styles = {
    primary: `${primaryBase} px-4 py-3 md:px-6 md:py-4`,
    secondary: `${secondaryBase} px-4 py-3 md:px-6 md:py-4`,
    small: `${primaryBase} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    smallRounded: `${primaryBase} px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    secundarySmall: `${secondaryBase} px-4 py-2 md:px-5 md:py-2.5 text-xs`,
  };

  if (to)
    return (
      <Link to={to} className={styles[typeButton]}>
        {children}
      </Link>
    );

  return (
    <button {...props} className={styles[typeButton]}>
      {children}
    </button>
  );
}

export default Button;
