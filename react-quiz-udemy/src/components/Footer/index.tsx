import type { ActionProps } from "../../reducers/questionReducer";
import styles from "./styles.module.css";

type FooterProps = {
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  answer: number | null;
  index: number;
  count: number;
};

export function Footer({ dispatch, answer, index, count }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span>10:00</span>

      {answer !== null && index < count - 1 && (
        <button onClick={() => dispatch({ type: "next" })} className="default">
          Next
        </button>
      )}

      {index === count - 1 && (
        <button
          onClick={() => dispatch({ type: "finished" })}
          className="default"
        >
          Finish
        </button>
      )}
    </footer>
  );
}
