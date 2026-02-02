import { useEffect } from "react";
import type { ActionProps } from "../../reducers/questionReducer";

type TimerProps = {
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  timer: number;
};

export function Timer({ dispatch, timer }: TimerProps) {
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

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
