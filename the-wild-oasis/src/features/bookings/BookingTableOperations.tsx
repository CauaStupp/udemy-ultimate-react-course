import SortBy from "@/ui/SortBy";
import Filter from "@/ui/Filter";
import TableOperations from "@/ui/TableOperations";

const filterOptions = [
  { value: "all", label: "All" },
  { value: "checked-out", label: "Checked out" },
  { value: "checked-in", label: "Checked in" },
  { value: "unconfirmed", label: "Unconfirmed" },
];

const sortOptions = [
  { value: "start-desc", label: "Sort by date (recent first)" },
  { value: "start-asc", label: "Sort by date (earlier first)" },
  {
    value: "total_price-desc",
    label: "Sort by amount (high first)",
  },
  { value: "total_price-asc", label: "Sort by amount (low first)" },
];

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter filterName="status" options={filterOptions} />

      <SortBy options={sortOptions} />
    </TableOperations>
  );
}

export default BookingTableOperations;
