import styles from "./styles.module.css";

type ProgressProps = {
  maxValue: number;
  value: number;
  points: number;
  maxPoints: number;
  answer: number | null;
};

export function Progress({
  maxValue,
  value,
  points,
  maxPoints,
  answer,
}: ProgressProps) {
  return (
    <div className={styles.containerProgress}>
      <progress
        max={maxValue}
        value={value + Number(answer !== null)}
        className={styles.progress}
      />

      <div className={styles.counts}>
        <p>
          Questions:{" "}
          <span className="emphasis">
            {value + 1} / {maxValue}
          </span>
        </p>
        <p>
          Points:{" "}
          <span className="emphasis">
            {points} / {maxPoints}
          </span>
        </p>
      </div>
    </div>
  );
}
