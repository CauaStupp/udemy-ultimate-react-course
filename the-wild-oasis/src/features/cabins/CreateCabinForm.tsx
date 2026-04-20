import Input from "@/ui/Input";
import Form from "@/ui/Form";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Textarea from "@/ui/Textarea";
import FormRow from "@/ui/FormRow";

import { useForm } from "react-hook-form";
import { useCreateCabinMutation, useEditCabinMutation } from "./cabinMutations";
import type { CabinTypeMod, CreateCabinType } from "@/@types/cabinsType";

type CreateCabinFormProps = {
  cabinEdit?: CabinTypeMod;
  onCloseModal?: () => void;
};

function CreateCabinForm({ cabinEdit, onCloseModal }: CreateCabinFormProps) {
  const isEditSession = Boolean(cabinEdit);
  const { register, handleSubmit, getValues, formState } =
    useForm<CreateCabinType>({
      defaultValues: isEditSession ? cabinEdit : {},
    });
  const { isCreating, mutateCreateCabin } =
    useCreateCabinMutation(onCloseModal);
  const { isEditing, mutateEditCabin } = useEditCabinMutation(onCloseModal);

  const { errors } = formState;

  function onSubmit(data: CreateCabinType) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession) {
      mutateEditCabin({
        ...data,
        image,
        id: cabinEdit!.id,
      });
    } else {
      mutateCreateCabin({
        ...data,
        image: data.image[0],
      });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      $type={onCloseModal ? "modal" : "normal"}
    >
      <FormRow label="Cabin Name" error={errors.name?.message} id="name">
        <Input
          type="text"
          id="name"
          disabled={isCreating || isEditing}
          placeholder="001 or more"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Max capacity"
        error={errors.maxCapacity?.message}
        id="maxCapacity"
      >
        <Input
          type="number"
          id="maxCapacity"
          placeholder="1 or more"
          disabled={isCreating || isEditing}
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={errors.regularPrice?.message}
        id="regularPrice"
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating || isEditing}
          placeholder="30 or more"
          {...register("regularPrice", {
            required: "This field is required",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors.discount?.message} id="discount">
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isCreating || isEditing}
          {...register("discount", {
            required: "This field is required",
            valueAsNumber: true,
            validate: (value) =>
              value < getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description"
        error={errors.description?.message}
        id="description"
      >
        <Textarea
          id="description"
          defaultValue=""
          disabled={isCreating || isEditing}
          placeholder="Nice house"
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin Photo" error={errors.image?.message} id="image">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
          disabled={isCreating || isEditing}
        />
      </FormRow>

      <FormRow>
        <Button
          $variation="secondary"
          type="reset"
          disabled={isCreating || isEditing}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating || isEditing}>
          {isEditSession
            ? `${isEditing ? "Editing..." : "Edit cabin"}`
            : `${isCreating ? "Creating..." : "Create cabin"}`}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
