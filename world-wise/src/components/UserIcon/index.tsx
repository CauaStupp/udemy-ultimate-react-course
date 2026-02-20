import { useUserContext } from "@/contexts/userContext";
import styles from "./styles.module.css";

type UserIconProps = {
  isPreview?: boolean;
  namePreview?: string;
  imagePreview?: string;
};

export function UserIcon({
  isPreview,
  namePreview,
  imagePreview,
}: UserIconProps) {
  const { user, handleLogout } = useUserContext();
  if (isPreview)
    return (
      <div className={styles.preview}>
        <div className={styles.content}>
          <img src={imagePreview} alt="User Photo" className={styles.userImg} />
          <h3 className={styles.name}>Welcome, {namePreview}</h3>
          <button className={styles.logout}>Logout</button>
        </div>
      </div>
    );

  if (!user) return null;
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
