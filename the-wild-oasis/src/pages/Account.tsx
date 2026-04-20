import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";
import { Heading, HeadingH3 } from "@/ui/Heading";
import Row from "@/ui/Row";

function Account() {
  return (
    <>
      <Heading>Update your account</Heading>

      <Row>
        <HeadingH3>Update user data</HeadingH3>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <HeadingH3>Update password</HeadingH3>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
