import { useEffect } from "react";
import { useQuestionsContext } from "../../contexts/questionsContext";

export function Timer() {
  const { seconds: timer, dispatch } = useQuestionsContext();
  const isTimer = timer ? timer : 0;
  const minutes = Math.floor(isTimer / 60);
  const seconds = isTimer % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);

  if (!timer) return <span className="default">N/A</span>;

  return (
    <button className="default">
      {minutes < 10 && "0"}
      {minutes}:{seconds < 10 && "0"}
      {seconds}
    </button>
  );
}
