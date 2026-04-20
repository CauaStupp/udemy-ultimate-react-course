import { Heading } from "@/ui/Heading";
import Row from "@/ui/Row";
import BookingTable from "@/features/bookings/BookingTable";
import BookingTableOperations from "@/features/bookings/BookingTableOperations";
import { FadeIn } from "@/styles/animations";

function Bookings() {
  return (
    <>
      <FadeIn>
        <Row $direction="column">
          <Heading>All bookings</Heading>

          <BookingTableOperations />
        </Row>
      </FadeIn>

      <Row>
        <BookingTable />
      </Row>
    </>
  );
}

export default Bookings;
