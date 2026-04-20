import Button from "@/ui/Button";
import Form from "@/ui/Form";
import FormRow from "@/ui/FormRow";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import type { CreateNewUserType } from "@/@types/userType";
import { useCreateNewUserMutation } from "./useAuthMutations";
import SpinnerMini from "@/ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, reset, getValues, handleSubmit } =
    useForm<CreateNewUserType>();
  const { mutate: createNewUser, isPending: isCreating } =
    useCreateNewUserMutation();
  const { errors } = formState;

  function onSubmit(data: CreateNewUserType) {
    const { email, full_name, password, password_confirm } = data;

    if (!data || !email || !full_name || !password || !password_confirm)
      return null;

    createNewUser(
      {
        email,
        full_name,
        password,
      },
      { onSettled: () => reset() },
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors.full_name?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreating}
          {...register("full_name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreating}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isCreating}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors.password_confirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isCreating}
          {...register("password_confirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset" disabled={isCreating}>
          Cancel
        </Button>
        <Button type="submit" disabled={isCreating}>
          {isCreating ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
