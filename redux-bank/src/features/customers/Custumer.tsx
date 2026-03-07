import { useSelector } from "react-redux";
import type { RootReducerType } from "../../redux/store";

function Customer() {
  const customer = useSelector(
    (store: RootReducerType) => store.customer.fullName,
  );

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
