import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();
    if (!query) return null;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input
        placeholder="Search order #"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 text-sm transition-all bg-stone-50 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-600/50 sm:focus:w-72 w-32 sm:w-64"
      />
    </form>
  );
}

export default SearchOrder;
