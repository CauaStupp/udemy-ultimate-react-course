import { getToday } from "@/utils/helpers";
import supabase from "./supabase";
import type {
  BookingAfterDate,
  BookingType,
  GetBookingsReturn,
} from "@/@types/bookingsType";
import { PAGE_SIZE } from "@/utils/constants";

type GetBookingsType = {
  filter: {
    field: string;
    value: string;
  } | null;
  sortBy: {
    field: string;
    direction: string;
  };
  page: number;
};

export async function getBookings({
  filter,
  sortBy,
  page,
}: GetBookingsType): Promise<GetBookingsReturn | null> {
  let query = supabase
    .from("bookings")
    .select(
      "id, created_at, start, end, nights, guests_number, status, total_price, cabins(name), guests(full_name, email)",
      { count: "exact" },
    );

  if (filter) query = query.eq(filter.field, filter.value);
  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error.message);
    throw new Error("Bookings could not be loaded");
  }

  return { data, count } as unknown as GetBookingsReturn;
}

export async function getBooking(id: number): Promise<BookingType | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data as BookingType;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(
  date: string,
): Promise<BookingAfterDate[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, total_price, extra_price")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(
  date: string,
): Promise<Omit<BookingType[], "cabins">> {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(full_name)")
    .gte("start", date)
    .lte("start", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity(): Promise<BookingType[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(full_name, nationality, country_flag)")
    .or(
      `and(status.eq.unconfirmed,start.eq.${getToday()}),and(status.eq.checked-in,end.eq.${getToday()})`,
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(
  id: number,
  obj: { status?: string; ispaid?: boolean },
): Promise<BookingType> {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id: number) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
