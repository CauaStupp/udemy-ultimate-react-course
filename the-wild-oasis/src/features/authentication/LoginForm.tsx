import { useState, type ChangeEvent } from "react";
import SpinnerMini from "@/ui/SpinnerMini";
import Button from "@/ui/Button";
import Form from "@/ui/Form";
import Input from "@/ui/Input";
import FormRowVertical from "@/ui/FormRowVertical";
import { useLoginMutation } from "./useAuthMutations";
import { toast } from "react-toastify";

function LoginForm() {
  const [email, setEmail] = useState("jonas@gmail.com");
  const [password, setPassword] = useState("jonas");
  const { mutate: login, isPending } = useLoginMutation();

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();

    if (!email || !password) {
      return toast.info("Need email or password to make login");
    }

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address" id="email">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>

      <FormRowVertical label="Password" id="password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button $size="large" disabled={isPending}>
          {!isPending ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
