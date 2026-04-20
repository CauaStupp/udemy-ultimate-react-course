import styled from "styled-components";

import Row from "@/ui/Row";
import { Heading } from "@/ui/Heading";
import ButtonGroup from "@/ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";

import { useMoveBack } from "@/hooks/useMoveBack";
import { getBookingQuery } from "../bookings/bookingQueries";
import Spinner from "@/ui/Spinner";
import ErrorFallback from "@/ui/ErrorFallback";
import Empty from "@/ui/Empty";
import BookingDataBox from "../bookings/BookingDataBox";
import Checkbox from "@/ui/Checkbox";
import { useState } from "react";
import { formatCurrency } from "@/utils/helpers";
import { useCheckingMutation } from "./checkingMutation";
import { getSettingsQuery } from "../settings/settingsQueries";

const Box = styled.div`
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const {
    data: booking,
    isLoading: isLoadingBooking,
    error: errorBooking,
  } = getBookingQuery();
  const {
    data: settings,
    isLoading: isLoadingSettings,
    error: errorSettings,
  } = getSettingsQuery();
  const [confirmPaid, setConfirmPaid] = useState<boolean>(() => {
    return booking?.ispaid ?? false;
  });
  const [addBreakFast, setAddBreakFast] = useState<boolean>(() => {
    return booking?.has_breakfast ?? false;
  });
  const moveBack = useMoveBack();
  const { mutate: checking, isPending } = useCheckingMutation();

  if (isLoadingBooking || isLoadingSettings) return <Spinner />;
  if (errorBooking) {
    return (
      <ErrorFallback
        errorMessage={errorBooking.message}
        errorName={errorBooking.name}
      />
    );
  }
  if (errorSettings) {
    return (
      <ErrorFallback
        errorMessage={errorSettings.message}
        errorName={errorSettings.name}
      />
    );
  }
  if (!booking || !settings) return <Empty resourceName="Checking" />;

  const {
    id: bookingId,
    guests,
    total_price,
    guests_number,
    has_breakfast,
    nights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfast_price * nights * guests_number;

  function handleCheckin() {
    if (!confirmPaid || !booking) return;

    if (addBreakFast) {
      checking({
        bookingId: booking.id,
        breakfast: {
          has_breakfast: true,
          extra_price: optionalBreakfastPrice,
          total_price: total_price + optionalBreakfastPrice,
        },
      });
    } else {
      checking({ bookingId: booking.id });
    }
  }

  return (
    <>
      <Row $direction="row">
        <Heading>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!has_breakfast && (
        <Box>
          <Checkbox
            checked={addBreakFast}
            id="breakfast"
            onChange={() => {
              setAddBreakFast((state) => !state);
              setConfirmPaid(false);
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id="paid"
          disabled={confirmPaid || isPending}
          checked={confirmPaid}
          onChange={() => setConfirmPaid((state) => !state)}
        >
          I confirm that {guests.full_name} has paid the total amount of{" "}
          {!addBreakFast
            ? formatCurrency(total_price)
            : `${formatCurrency(total_price + optionalBreakfastPrice)} (${formatCurrency(total_price)} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isPending}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
