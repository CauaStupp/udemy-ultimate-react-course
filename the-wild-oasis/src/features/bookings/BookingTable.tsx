import Table from "@/ui/Table";
import Empty from "@/ui/Empty";
import Menus from "@/ui/Menus";
import Spinner from "@/ui/Spinner";
import ErrorFallback from "@/ui/ErrorFallback";
import BookingRow from "./BookingRow";
import { getBookingsQuery } from "./bookingQueries";
import Pagination from "@/ui/Pagination";
import { FadeIn } from "@/styles/animations";

function BookingTable() {
  const { data, isLoading, error } = getBookingsQuery();
  const bookings = data?.data;
  const count = data?.count || 0;

  if (isLoading) return <Spinner />;
  if (!bookings) return <Empty resourceName="bookings" />;
  if (error)
    return (
      <ErrorFallback errorMessage={error.message} errorName={error.name} />
    );

  return (
    <FadeIn>
      <Menus>
        <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            items={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />
        </Table>

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Menus>
    </FadeIn>
  );
}

export default BookingTable;
