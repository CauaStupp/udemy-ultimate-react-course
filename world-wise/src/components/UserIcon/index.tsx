import { useUserContext } from "@/contexts/userContext";
import styles from "./styles.module.css";
import { Navigate } from "react-router-dom";

export function UserIcon() {
  const { user, handleLogout } = useUserContext();

  if (!user) return <Navigate to="/login" />;
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img src={user.image} alt="User Photo" className={styles.userImg} />
        <h3 className={styles.name}>Welcome, {user.name}</h3>
        <button className={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
