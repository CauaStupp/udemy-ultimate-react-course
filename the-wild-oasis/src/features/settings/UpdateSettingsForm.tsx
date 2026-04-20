import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import { getSettingsQuery } from "./settingsQueries";
import ErrorFallback from "@/ui/ErrorFallback";
import Spinner from "@/ui/Spinner";
import { settingsUpdateMutation } from "./settingsMutations";
import type {
  SettingsFormType,
  SettingsUpdateType,
} from "@/@types/settingsType";
import { useForm } from "react-hook-form";

function UpdateSettingsForm() {
  const { data, isLoading, error } = getSettingsQuery();
  const { isUpdating, mutate } = settingsUpdateMutation();
  const { register } = useForm<SettingsFormType>();

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    fieldName: keyof SettingsUpdateType,
  ) {
    const { value } = e.target;

    if (!value) return;

    // Mutate enviando apenas o campo alterado
    mutate({ [fieldName]: Number(value) });
  }

  if (error) {
    return (
      <ErrorFallback errorMessage={error.message} errorName={error.name} />
    );
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={data?.min_booking_length}
          disabled={isUpdating}
          {...register("minBookingLength")}
          onBlur={(e) => handleUpdate(e, "min_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={data?.max_booking_length}
          disabled={isUpdating}
          {...register("maxBookingLength")}
          onBlur={(e) => handleUpdate(e, "max_booking_length")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={data?.max_guest_per_booking}
          disabled={isUpdating}
          {...register("maxGuestPerBooking")}
          onBlur={(e) => handleUpdate(e, "max_guest_per_booking")}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={data?.breakfast_price}
          disabled={isUpdating}
          {...register("breakfastPrice")}
          onBlur={(e) => handleUpdate(e, "breakfast_price")}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
