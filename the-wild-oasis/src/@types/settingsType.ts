export type SettingsType = {
  id: number;
  created_at: string;
  min_booking_length: number;
  max_booking_length: number;
  max_guest_per_booking: number;
  breakfast_price: number;
};

export type SettingsFormType = {
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestPerBooking: number;
  breakfastPrice: number;
};

export type SettingsUpdateType = {
  min_booking_length?: number;
  max_booking_length?: number;
  max_guest_per_booking?: number;
  breakfast_price?: number;
};
