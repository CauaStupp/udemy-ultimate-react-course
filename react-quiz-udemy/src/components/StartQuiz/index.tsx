import type { ActionProps } from "../../reducers/questionReducer";
import styles from "./styles.module.css";

type StartQuizProps = {
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  quizCount?: number;
};

export function StartQuiz({ dispatch, quizCount }: StartQuizProps) {
  return (
    <div className={styles.container}>
      <h2>Start The Quiz</h2>
      <p>
        {quizCount ? quizCount : "N/A"} Questions to test your React Mastery
      </p>
      <button
        onClick={() => dispatch({ type: "dataStarted" })}
        className="default"
      >
        Start
      </button>
    </div>
  );
}
