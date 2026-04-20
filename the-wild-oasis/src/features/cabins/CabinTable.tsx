import Spinner from "@/ui/Spinner";
import Table from "@/ui/Table";
import Menus from "@/ui/Menus";
import ErrorFallback from "@/ui/ErrorFallback";
import Empty from "@/ui/Empty";
import CabinRow from "./CabinRow";
import { useGetCabinsQuery } from "./cabinQueries";
import { useSearchParams } from "react-router";
import type { CabinsType } from "@/@types/cabinsType";
import { FadeIn } from "@/styles/animations";

function CabinTable() {
  const { isLoading, data, error } = useGetCabinsQuery();
  const [searchParams] = useSearchParams();

  // Error and loading
  if (isLoading) return <Spinner />;
  if (!data) return <Empty resourceName="cabins" />;
  if (error)
    return (
      <ErrorFallback errorMessage={error.message} errorName={error.name} />
    );

  // Filter
  let filteredCabin;
  const filterValue = searchParams.get("discount") || "all";
  if (filterValue === "all") filteredCabin = data;
  if (filterValue === "no-discount")
    filteredCabin = data.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = data.filter((cabin) => cabin.discount > 0);

  // Sort
  const sortByValue = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortByValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabin?.sort(
    (a, b) =>
      ((a[field as keyof CabinsType] as number) -
        (b[field as keyof CabinsType] as number)) *
      modifier,
  );

  return (
    <Menus>
      <FadeIn>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Cabins</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            items={sortedCabins || []}
            render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
          />
        </Table>
      </FadeIn>
    </Menus>
  );
}

export default CabinTable;
