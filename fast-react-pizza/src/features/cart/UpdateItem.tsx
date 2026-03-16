import Button from "@/ui/Button";
import { decrement, increment } from "./cartSlice";
import { useAppDispatch } from "@/hooks/reduxExtends";

type UpdateItemProps = {
  pizzaId: number;
  quantity: number;
};

function UpdateItem({ pizzaId, quantity }: UpdateItemProps) {
  const dispatch = useAppDispatch();

  function handleIncrease() {
    dispatch(increment({ pizzaId }));
  }

  function handleDecrement() {
    dispatch(decrement({ pizzaId }));
  }

  return (
    <div className="flex gap-2 items-center">
      <Button typeButton="smallRounded" onClick={handleDecrement}>
        -
      </Button>

      <p className="text-sm font-medium">{quantity}</p>
      <Button typeButton="smallRounded" onClick={handleIncrease}>
        +
      </Button>
    </div>
  );
}

export default UpdateItem;
