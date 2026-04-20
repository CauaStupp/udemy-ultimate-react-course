import type { BookingType } from "@/@types/bookingsType";
import Button from "@/ui/Button";
import { Flag } from "@/ui/Flag";
import Tag from "@/ui/Tag";
import { Link } from "react-router";
import styled from "styled-components";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: ${(props) => props.theme.colors.grey[100]};

  &:first-child {
    border-top: 1px solid ${(props) => props.theme.colors.grey[100]};
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ id, status, guests, nights }: BookingType) {
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag $variation="green">Arriving</Tag>}
      {status === "checked-in" && <Tag $variation="blue">Departing</Tag>}

      <Flag src={guests.country_flag} alt={`Flag of ${guests.nationality}`} />
      <Guest>{guests.full_name}</Guest>
      <div>{nights} nights</div>

      {status === "unconfirmed" && (
        <Button
          $variation="primary"
          $size="small"
          to={`/checkin/${id}`}
          as={Link}
        >
          Check in
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
