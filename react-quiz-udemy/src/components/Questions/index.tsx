import { useQuestionsContext } from "../../contexts/questionsContext";
import { Options } from "../Question";
import styles from "./styles.module.css";

export function Questions() {
  const { questions, index } = useQuestionsContext();
  const question = questions && questions[index];

  if (!question) return null;
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{question.question}</h2>
      <Options key={question.question} question={question} />
    </div>
  );
}
