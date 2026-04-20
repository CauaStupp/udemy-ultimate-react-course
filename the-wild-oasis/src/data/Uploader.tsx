import { useState } from "react";
import { isFuture, isPast, isToday } from "date-fns";
import supabase from "@/services/supabase";
import Button from "@/ui/Button";
import { subtractDates } from "@/utils/helpers";

import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import styled from "styled-components";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

const StyledUploader = styled.div`
  background-color: ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.sm};
  margin-top: auto;
  padding: 1rem;
  display: flex;
  gap: 0.6rem;
  flex-direction: column;
  color: ${(props) => props.theme.colors.grey[900]};
`;

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = (await supabase
    .from("guests")
    .select("id")
    .order("id")) as { data: { id: number }[] };
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = (await supabase
    .from("cabins")
    .select("id")
    .order("id")) as { data: { id: number }[] };
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabin_id - 1);
    const numNights = subtractDates(booking.end, booking.start);
    const cabinPrice = cabin
      ? numNights * (cabin.regular_price - cabin.discount)
      : 0;
    const extrasPrice = booking.has_breakfast
      ? numNights * 15 * booking.guests_number
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (isPast(new Date(booking.end)) && !isToday(new Date(booking.end)))
      status = "checked-out";
    if (isFuture(new Date(booking.start)) || isToday(new Date(booking.start)))
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.end)) || isToday(new Date(booking.end))) &&
      isPast(new Date(booking.start)) &&
      !isToday(new Date(booking.start))
    )
      status = "checked-in";

    return {
      ...booking,
      nights: numNights,
      cabin_price: cabinPrice,
      extra_price: extrasPrice,
      total_price: totalPrice,
      guest_id: allGuestIds.at(booking.guest_id - 1),
      cabin_id: allCabinIds.at(booking.cabin_id - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }

  return (
    <StyledUploader>
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </StyledUploader>
  );
}

export default Uploader;
