import type { QuestionType } from "../@types/QuestionsType";

export type Status = "loading" | "error" | "ready" | "active" | "finished";

type Ready = {
  type: "getData";
  payload: QuestionType[] | null;
};

type Failed = {
  type: "dataFailed";
};

type Started = {
  type: "dataStarted";
};

type Answer = {
  type: "newAnswer";
  payload: number;
};

type Next = {
  type: "next";
};

type Finished = {
  type: "finished";
};

type Reset = {
  type: "reset";
};

type Timer = {
  type: "timer";
};

export type ActionProps =
  | Ready
  | Failed
  | Started
  | Answer
  | Next
  | Finished
  | Reset
  | Timer;

type QuestionState = {
  questions: QuestionType[] | null;
  status: Status;
  index: number;
  answer: number | null;
  points: number;
  seconds: number | null;
};

export function questionReducer(
  state: QuestionState,
  action: ActionProps,
): QuestionState {
  switch (action.type) {
    case "getData":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };

    case "dataFailed":
      return {
        ...state,
        status: "error",
      };

    case "dataStarted":
      return {
        ...state,
        status: "active",
        seconds: state.questions ? state.questions.length * 30 : state.seconds,
      };

    case "newAnswer":
      const question = state.questions?.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question?.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "next":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };

    case "finished":
      return {
        ...state,
        status: "finished",
      };

    case "reset":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        points: 0,
      };

    case "timer":
      return {
        ...state,
        seconds: state.seconds ? state.seconds - 1 : state.seconds,
        status: state.seconds && state.seconds <= 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action don't exists");
  }
}
