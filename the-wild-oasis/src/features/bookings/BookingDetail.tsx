import styled from "styled-components";

import { Heading } from "@/ui/Heading";
import BookingDataBox from "./BookingDataBox";
import Row from "@/ui/Row";
import Tag from "@/ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "@/ui/Button";
import ButtonText from "@/ui/ButtonText";
import Empty from "@/ui/Empty";
import Spinner from "@/ui/Spinner";
import ErrorFallback from "@/ui/ErrorFallback";

import { useMoveBack } from "@/hooks/useMoveBack";
import { getBookingQuery } from "./bookingQueries";
import { useNavigate } from "react-router";
import { useCheckoutMutation } from "../check-in-out/checkoutMutation";
import { deleteBookingMutation } from "./deleteBookingMutation";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading, error } = getBookingQuery();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckoutMutation();
  const { mutate: deleteBooking, isPending: isDeleting } =
    deleteBookingMutation();
  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <ErrorFallback errorMessage={error.message} errorName={error.name} />
    );
  if (!booking) return <Empty resourceName="Booking" />;

  return (
    <>
      <Row $direction="row">
        <HeadingGroup>
          <Heading>Booking #{booking.id}</Heading>
          <Tag $variation={statusToTagName[booking.status]}>
            {booking.status.replace("-", " ")};
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${booking.id}`)}>
            Check in
          </Button>
        )}

        {booking.status === "checked-in" && (
          <Button onClick={() => checkOut(booking.id)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opensWindowName="delete-booking">
            <Button $variation="danger" disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disabled={isDeleting}
              resourceName={`#${booking.id}`}
              onConfirm={() =>
                deleteBooking(booking.id, {
                  onSettled() {
                    navigate(-1);
                  },
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
