import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import DataItem from "@/ui/DataItem";
import { Flag } from "@/ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "@/utils/helpers";
import type { BookingType } from "@/@types/bookingsType";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: ${(props) => props.theme.colors.grey[0]};
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius.md};

  overflow: hidden;
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.colors.brand[500]};
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: ${(props) => props.theme.colors.grey[500]};

  & p:first-of-type {
    font-weight: 500;
    color: ${(props) => props.theme.colors.grey[700]};
  }
`;

const Price = styled.div<{ $isPaid?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.$isPaid
      ? props.theme.colors.green[100]
      : props.theme.colors.yellow[100]};
  color: ${(props) =>
    props.$isPaid
      ? props.theme.colors.green[700]
      : props.theme.colors.yellow[700]};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.grey[500]};
  text-align: right;
`;

type BookingDataBoxProps = {
  booking: BookingType;
};

// A purely presentational component
function BookingDataBox({ booking }: BookingDataBoxProps) {
  const {
    created_at,
    start,
    end,
    cabin_price,
    extra_price,
    cabins: { name: cabinName },
    guests: { country_flag, email, full_name, nationality, national_id },
    guests_number,
    has_breakfast,
    ispaid,
    nights,
    total_price,
    observations,
  } = booking;

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            {nights} nights in Cabin <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(start), "EEE, MMM dd yyyy")} (
          {isToday(new Date(start)) ? "Today" : formatDistanceFromNow(start)})
          &mdash; {format(new Date(end), "EEE, MMM dd yyyy")}
        </p>
      </Header>

      <Section>
        <Guest>
          {country_flag && (
            <Flag
              src={country_flag}
              alt={`Flag of ${nationality}`}
              title={nationality}
            />
          )}
          <p>
            {full_name}{" "}
            {guests_number > 1 ? `+ ${guests_number - 1} guests` : ""}
          </p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>National ID {national_id}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<HiOutlineCheckCircle />} label="Breakfast included?">
          {has_breakfast ? "Yes" : "No"}
        </DataItem>

        <Price $isPaid={ispaid}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total price`}>
            {formatCurrency(total_price)}

            {has_breakfast &&
              ` (${formatCurrency(cabin_price)} cabin + ${formatCurrency(
                extra_price,
              )} breakfast)`}
          </DataItem>

          <p>{ispaid ? "Paid" : "Will pay at property"}</p>
        </Price>
      </Section>

      <Footer>
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default BookingDataBox;
