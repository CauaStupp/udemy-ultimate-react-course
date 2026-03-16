import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { Link, useNavigate } from "react-router-dom";

type LinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
};

function LinkButton({ children, ...props }: LinkButtonProps) {
  const navigate = useNavigate();
  const className =
    "text-sm cursor-pointer text-blue-500 hover:text-blue-600 hover:underline";

  if (props.to === "-1")
    return (
      <button type="button" onClick={() => navigate(-1)} className={className}>
        {children}
      </button>
    );

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}

export default LinkButton;
