import { useQuestionsContext } from "../../contexts/questionsContext";
import styles from "./styles.module.css";

export function Progress() {
  const { questions, index, points, answer, maxPoints } = useQuestionsContext();

  return (
    <div className={styles.containerProgress}>
      <progress
        max={questions?.length}
        value={index + Number(answer !== null)}
        className={styles.progress}
      />

      <div className={styles.counts}>
        <p>
          Questions:{" "}
          <span className="emphasis">
            {index + 1} / {questions?.length}
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
