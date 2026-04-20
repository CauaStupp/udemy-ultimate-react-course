import { useContext, type Context } from "react";

export function useMyContext<T>(context: Context<T>, errorMessage?: string) {
  const isContext = useContext(context);
  if (!isContext)
    throw new Error(errorMessage ? errorMessage : "Error in context");
  return isContext;
}
