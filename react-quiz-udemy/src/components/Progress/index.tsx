import styles from "./styles.module.css";

type ProgressProps = {
  max: number;
  value: number;
  points: number;
};

export function Progress({ max, value, points }: ProgressProps) {
  return (
    <div className={styles.containerProgress}>
      <progress
        max={max}
        value={value ? value : 0}
        className={styles.progress}
      />

      <div className={styles.counts}>
        <span>
          Questions {value} / {max}
        </span>
        <span>{points} / 280 Points</span>
      </div>
    </div>
  );
}
