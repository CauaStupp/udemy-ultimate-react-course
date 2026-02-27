import { useQuestionsContext } from "../../contexts/questionsContext";

export function NextButton() {
  const { questions, answer, index, dispatch } = useQuestionsContext();
  const totalQuestions = questions ? questions.length : 0;

  if (answer !== null && index < totalQuestions - 1) {
    return (
      <button onClick={() => dispatch({ type: "next" })} className="default">
        Next
      </button>
    );
  }

  if (index === totalQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: "finished" })}
        className="default"
      >
        Finish
      </button>
    );
  }
}
