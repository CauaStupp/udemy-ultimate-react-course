import type { BookingAfterDate, BookingType } from "@/@types/bookingsType";
import Stat from "./Stat";
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { formatCurrency } from "@/utils/helpers";

type StatsProps = {
  bookings: BookingAfterDate[];
  confirmedStays: BookingType[];
  numDays: number;
  cabinCount: number;
};

function Stats({ bookings, confirmedStays, cabinCount, numDays }: StatsProps) {
  const numBookings = bookings.length;
  const sales = formatCurrency(bookings.reduce((a, b) => a + b.total_price, 0));
  const checkins = confirmedStays.length;
  const occupation =
    confirmedStays.reduce((a, b) => a + b.nights, 0) / (numDays * cabinCount);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={sales}
      />
      <Stat
        title="Check ins"
        color="brand"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(occupation * 100)}%`}
      />
    </>
  );
}

export default Stats;
