import SignupForm from "@/features/authentication/SignupForm";
import { FadeIn } from "@/styles/animations";
import { Heading } from "@/ui/Heading";

function NewUsers() {
  return (
    <FadeIn>
      <Heading>Create a new user</Heading>
      <SignupForm />
    </FadeIn>
  );
}

export default NewUsers;
