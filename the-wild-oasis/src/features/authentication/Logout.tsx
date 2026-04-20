import ButtonIcon from "@/ui/ButtonIcon";
import SpinnerMini from "@/ui/SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogoutMutation } from "./useAuthMutations";

function Logout() {
  const { logout, isPending } = useLogoutMutation();

  return (
    <ButtonIcon onClick={() => logout()} disabled={isPending}>
      {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
