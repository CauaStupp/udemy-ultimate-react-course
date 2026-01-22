import styles from "./styles.module.css";

type FinishQuizProps = {
  points: number;
  maxPoints: number;
};

export function FinishQuiz({ points, maxPoints }: FinishQuizProps) {
  const percentage = (points / maxPoints) * 100;

  return (
    <p className={styles.finished}>
      You scored {points} out of {maxPoints} <em>{Math.ceil(percentage)}%</em>
    </p>
  );
}
