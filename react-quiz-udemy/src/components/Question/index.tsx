import styles from "./styles.module.css";
import type { QuestionType } from "../../@types/QuestionsType";
import type { ActionProps } from "../../reducers/questionReducer";

type OptionsProps = {
  question: QuestionType;
  answer: number | null;
  dispatch: React.ActionDispatch<[action: ActionProps]>;
};

export function Options({ question, answer, dispatch }: OptionsProps) {
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
