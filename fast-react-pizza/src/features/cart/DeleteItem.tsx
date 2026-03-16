import { useAppDispatch } from "@/hooks/reduxExtends";
import Button, { type TypeButton } from "@/ui/Button";
import { deleteItem } from "./cartSlice";

type DeleteItemProps = {
  id: number;
  typeButton?: TypeButton;
};

function DeleteItem({ id, typeButton }: DeleteItemProps) {
  const dispatch = useAppDispatch();
  function handleRemoveToCart() {
    dispatch(deleteItem(id));
  }
  return (
    <Button type="button" typeButton={typeButton} onClick={handleRemoveToCart}>
      Delete
    </Button>
  );
}

export default DeleteItem;
