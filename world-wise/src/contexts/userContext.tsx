import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type UserType = {
  id: string;
  name: string;
  image: string;
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  handleLogin(user: Omit<UserType, "id">): void;
  handleLogout(): void;
};

const UserContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  function handleLogin(user: Omit<UserType, "id">) {
    if (!user || !user.name || !user.image)
      return alert("Please, confirm your name and image!");
    setUser({
      id: crypto.randomUUID(),
      ...user,
    });
    navigate("/app");
  }

  function handleLogout() {
    setUser(null);
  }

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext error");
  return context;
}
