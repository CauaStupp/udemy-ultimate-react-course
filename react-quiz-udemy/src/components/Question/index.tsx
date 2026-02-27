import styles from "./styles.module.css";
import type { QuestionType } from "../../@types/QuestionsType";
import { useQuestionsContext } from "../../contexts/questionsContext";

type OptionsProps = {
  question: QuestionType;
};

export function Options({ question }: OptionsProps) {
  const { answer, dispatch } = useQuestionsContext();
  const hasAnswer = answer !== null;

  return (
    <div className={styles.question}>
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`${styles.option} ${index === answer ? styles.answer : ""} ${hasAnswer ? (index === question.correctOption ? styles.correctOption : styles.incorrectOption) : ""}`}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswer}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
