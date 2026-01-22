import type { QuestionType } from "../@types/QuestionsType";

type Status = "loading" | "error" | "ready" | "active" | "finished";

type Ready = {
  type: "getData";
  payload: QuestionType[] | null;
};

type Failed = {
  type: "dataFailed";
  payload: null;
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

export type ActionProps = Ready | Failed | Started | Answer | Next | Finished;

type QuestionState = {
  questions: QuestionType[] | null;
  status: Status;
  index: number;
  answer: number | null;
  points: number;
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

    default:
      throw new Error("Action don't exists");
  }
}
