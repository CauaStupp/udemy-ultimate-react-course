import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

export function BackButton() {
  const navigate = useNavigate();
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <Button type="secondary" onClick={(e) => handleClick(e)}>
      Back
    </Button>
  );
}
