import { useRouteError, type ErrorResponse } from "react-router-dom";
import LinkButton from "./LinkButton";

interface NotFoundType extends ErrorResponse {
  error: {
    message: string;
    stack: string;
  };
  internal: boolean;
  status: number;
}

function NotFound() {
  const { error, status } = useRouteError() as NotFoundType;

  return (
    <div>
      <h1>Something went wrong 😢 ({status})</h1>
      <p>{error.message}</p>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default NotFound;
