import type { ActionProps } from "../../reducers/questionReducer";
import styles from "./styles.module.css";

type FinishQuizProps = {
  points: number;
  maxPoints: number;
  dispatch: React.ActionDispatch<[action: ActionProps]>;
};

export function FinishQuiz({ points, maxPoints, dispatch }: FinishQuizProps) {
  const percentage = (points / maxPoints) * 100;

  function emojiVerify() {
    if (percentage === 100) {
      return "😱";
    } else if (percentage >= 90) {
      return "😁";
    } else if (percentage >= 50 && percentage <= 70) {
      return "☺️";
    } else if (percentage >= 20 && percentage <= 50) {
      return "🤔";
    } else if (percentage >= 10 && percentage <= 20) {
      return "😩";
    } else if (percentage >= 1 && percentage <= 10) {
      return "🥶";
    } else if (percentage === 0) {
      return "😵";
    } else {
      return "😏";
    }
  }

  return (
    <>
      <p className={styles.finished}>
        {emojiVerify()} You scored {points}pt out of {maxPoints}pt{" "}
        <strong>({Math.ceil(percentage)}%)</strong>
      </p>
      <button className="default" onClick={() => dispatch({ type: "reset" })}>
        Restart Quiz
      </button>
    </>
  );
}
