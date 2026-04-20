import type { CreateNewUserType } from "@/@types/userType";
import {
  createNewUser,
  login,
  logoutUser,
  updateUserData,
} from "@/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return login({ email, password });
    },
    onSuccess: () => {
      toast.success("Login with success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}

export function useLogoutMutation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess() {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return { logout, isPending };
}

export function useCreateNewUserMutation() {
  // const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: ({
      email,
      password,
      full_name,
    }: Omit<CreateNewUserType, "password_confirm">) => {
      return createNewUser({ email, password, full_name });
    },
    onSuccess: () => {
      toast.success("New user created with success");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutation;
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserData,
    onSuccess({ user }) {
      toast.success("User account updated with success!");
      queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return {
    isUpdating,
    updateUser,
  };
}
