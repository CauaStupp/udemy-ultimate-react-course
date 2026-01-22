import type { ActionProps } from "../../reducers/questionReducer";
import styles from "./styles.module.css";

type FooterProps = {
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  answer: number | null;
};

export function Footer({ dispatch, answer }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <span>10:00</span>

      {answer !== null && (
        <button onClick={() => dispatch({ type: "next" })} className="default">
          Next
        </button>
      )}
    </footer>
  );
}
