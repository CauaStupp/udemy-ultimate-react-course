import React from "react";
import type { ActionProps } from "../../reducers/questionReducer";

type NextButtonProps = {
  dispatch: React.ActionDispatch<[action: ActionProps]>;
  answer: number | null;
  index: number;
  count: number;
};

export function NextButton({
  answer,
  index,
  count,
  dispatch,
}: NextButtonProps) {
  if (answer !== null && index < count - 1) {
    return (
      <button onClick={() => dispatch({ type: "next" })} className="default">
        Next
      </button>
    );
  }

  if (index === count - 1) {
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
