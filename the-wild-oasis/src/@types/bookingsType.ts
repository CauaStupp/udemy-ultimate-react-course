import type { CabinsType } from "./cabinsType";
import type { GuestsType } from "./guestsType";

export type BookingsType = {
  id: number;
  created_at: string;
  start: string;
  end: string;
  nights: number;
  guests_number: number;
  cabins: { name: string };
  guests: { email: string; full_name: string };
  status: "unconfirmed" | "checked-in" | "checked-out";
  total_price: number;
};

export type BookingType = {
  id: number;
  created_at: string;
  start: string;
  end: string;
  nights: number;
  guests_number: number;
  cabin_price: number;
  extra_price: number;
  total_price: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  has_breakfast: boolean;
  ispaid: boolean;
  observations: string;
  cabin_id: number;
  guest_id: number;
  cabins: CabinsType;
  guests: GuestsType;
};

export type BookingAfterDate = {
  created_at: string;
  total_price: number;
  extra_price: number;
};

export type GetBookingsReturn = {
  data: BookingsType[];
  count: number;
};
