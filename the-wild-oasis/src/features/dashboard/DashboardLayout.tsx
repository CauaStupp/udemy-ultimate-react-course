import styled from "styled-components";
import {
  useRecentBookingsQuery,
  useRecentStaysQuery,
} from "./dashboardQueries";
import Spinner from "@/ui/Spinner";
import ErrorFallback from "@/ui/ErrorFallback";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import { useGetCabinsQuery } from "../cabins/cabinQueries";
import { FadeIn } from "@/styles/animations";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
  width: 100%;

  @media (max-width: 1250px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
  }

  @media (max-width: 812px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

function DashboardLayout() {
  const {
    data: bookings,
    isLoading: bookingLoading,
    error: bookingError,
  } = useRecentBookingsQuery();
  const {
    data: stays,
    numDays,
    isLoading: stayLoding,
    error: stayError,
    confirmedStays,
  } = useRecentStaysQuery();
  const { data: cabins, isLoading: cabinsLoading } = useGetCabinsQuery();

  if (bookingLoading || stayLoding || cabinsLoading) return <Spinner />;
  if (bookingError) {
    return (
      <ErrorFallback
        errorMessage={bookingError.message}
        errorName={bookingError.name}
      />
    );
  }
  if (stayError) {
    return (
      <ErrorFallback
        errorMessage={stayError.message}
        errorName={stayError.name}
      />
    );
  }
  if (stays && bookings && confirmedStays && cabins)
    return (
      <FadeIn>
        <StyledDashboardLayout>
          <Stats
            bookings={bookings}
            confirmedStays={confirmedStays}
            cabinCount={cabins.length}
            numDays={numDays}
          />
          <TodayActivity />
          <DurationChart confirmedStays={confirmedStays} />
          <SalesChart bookings={bookings} numDays={numDays} />
        </StyledDashboardLayout>
      </FadeIn>
    );
}

export default DashboardLayout;
