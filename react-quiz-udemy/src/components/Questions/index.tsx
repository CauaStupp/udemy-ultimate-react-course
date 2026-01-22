import type { QuestionType } from "../../@types/QuestionsType";
import type { ActionProps } from "../../reducers/questionReducer";
import { Options } from "../Question";
import styles from "./styles.module.css";

type QuestionsProps = {
  question: QuestionType;
  answer: number | null;
  dispatch: React.ActionDispatch<[action: ActionProps]>;
};

export function Questions({ question, answer, dispatch }: QuestionsProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{question.question}</h2>
      <Options
        key={question.question}
        answer={answer}
        question={question}
        dispatch={dispatch}
      />
    </div>
  );
}
