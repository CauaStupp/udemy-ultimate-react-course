import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "@/ui/Tag";
import Table from "@/ui/Table";

import { formatCurrency } from "@/utils/helpers";
import { formatDistanceFromNow } from "@/utils/helpers";
import type { BookingsType } from "@/@types/bookingsType";
import Menus from "@/ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router";
import { useCheckoutMutation } from "../check-in-out/checkoutMutation";
import { deleteBookingMutation } from "./deleteBookingMutation";
import Modal from "@/ui/Modal";
import ConfirmDelete from "@/ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey[600]};
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: ${(props) => props.theme.colors.grey[500]};
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

type BookingRowProps = {
  booking: BookingsType;
};

function BookingRow({
  booking: {
    id: bookingId,
    start,
    end,
    nights,
    total_price,
    status,
    guests: { full_name: guestName, email },
    cabins: { name: cabinName },
  },
}: BookingRowProps) {
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckoutMutation();
  const { mutate: deleteBooking, isPending: isDeleting } =
    deleteBookingMutation();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  const navigate = useNavigate();

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(start)) ? "Today" : formatDistanceFromNow(start)}{" "}
          &rarr; {nights} night stay
        </span>
        <span>
          {format(new Date(start), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(end), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag $variation={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(total_price)}</Amount>

      <Menus.Menu>
        <Modal>
          <Menus.Toggle id={bookingId} />

          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`/bookings/${bookingId}`)}>
              <HiEye />
              See details
            </Menus.Button>

            {status === "unconfirmed" && (
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiArrowDownOnSquare />
                Check in
              </Menus.Button>
            )}

            {status === "checked-in" && (
              <Menus.Button
                onClick={() => checkOut(bookingId)}
                disabled={isCheckingOut}
              >
                <HiArrowUpOnSquare />
                Check out
              </Menus.Button>
            )}

            <Modal.Open opensWindowName="delete-booking">
              <Menus.Button disabled={isDeleting}>
                <HiTrash /> Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="delete-booking">
            <ConfirmDelete
              disabled={isDeleting}
              onConfirm={() => deleteBooking(bookingId)}
              resourceName={`Booking of (${guestName})`}
            />
          </Modal.Window>
        </Modal>
      </Menus.Menu>
    </Table.Row>
  );
}

export default BookingRow;
