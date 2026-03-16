import SearchOrder from "@/features/order/SearchOrder";
import Username from "@/features/user/Username";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-yellow-400 border-stone-200 flex gap-3 items-center justify-between px-4 py-3 uppercase border-b sm:px-6">
      <Link to="/" className="tracking-widest font-semibold">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
