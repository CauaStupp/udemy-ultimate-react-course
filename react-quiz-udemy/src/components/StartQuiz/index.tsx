import { useQuestionsContext } from "../../contexts/questionsContext";
import styles from "./styles.module.css";

export function StartQuiz() {
  const { questions, dispatch } = useQuestionsContext();
  const quizCount = questions?.length;

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
