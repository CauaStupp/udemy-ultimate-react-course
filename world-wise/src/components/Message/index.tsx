import styles from "./styles.module.css";

type MessageProps = {
  message?: string;
};

export function Message({ message }: MessageProps) {
  return (
    <h2 className={styles.message}>
      {message
        ? message
        : "👋 Add your first city by clicking on a city on the map"}
    </h2>
  );
}
