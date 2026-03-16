import { updateOrder } from "@/services/apiRestaurant";
import Button from "@/ui/Button";
import { useFetcher, type ActionFunctionArgs } from "react-router-dom";

function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <Button typeButton="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function updateOrderAction({ params }: ActionFunctionArgs) {
  const data = { priority: true };
  if (!params.orderId) return null;
  await updateOrder(params.orderId, data);
  return null;
}
