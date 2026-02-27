import { useQuestionsContext } from "../../contexts/questionsContext";
import styles from "./styles.module.css";

export function FinishQuiz() {
  const { points, maxPoints, dispatch } = useQuestionsContext();

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
