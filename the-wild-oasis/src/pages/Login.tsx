import Logo from "@/ui/Logo";
import LoginForm from "@/features/authentication/LoginForm";
import styled from "styled-components";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: ${(props) => props.theme.colors.grey[50]};
`;

const Heading = styled.h3`
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
`;

function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading>Login in to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
