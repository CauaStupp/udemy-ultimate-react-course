import Filter from "@/ui/Filter";
import SortBy from "@/ui/SortBy";
import TableOperations from "@/ui/TableOperations";

const optionsFilter = [
  { value: "all", label: "All" },
  { value: "no-discount", label: "No discount" },
  { value: "with-discount", label: "With discount" },
];

const optionsSort = [
  { value: "name-asc", label: "Sort by name (A-Z)" },
  { value: "name-desc", label: "Sort by name (Z-A)" },
  { value: "regular_price-asc", label: "Sort by price (low first)" },
  { value: "regular_price-desc", label: "Sort by price (high first)" },
  { value: "max-asc", label: "Sort by capacity (low first)" },
  { value: "max-desc", label: "Sort by capacity (high first)" },
];

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter filterName="discount" options={optionsFilter} />
      <SortBy options={optionsSort} />
    </TableOperations>
  );
}

export default CabinTableOperations;
