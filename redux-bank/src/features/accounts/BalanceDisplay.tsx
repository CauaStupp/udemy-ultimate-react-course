import { useAppSelector } from "../../hooks/hooks";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay() {
  const { isLoading, balance } = useAppSelector((store) => store.account);
  return (
    <div className="balance">
      {isLoading ? "Loading..." : formatCurrency(balance)}
    </div>
  );
}

export default BalanceDisplay;
