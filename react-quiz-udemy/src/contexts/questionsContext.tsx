import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import {
  questionReducer,
  type ActionProps,
  type Status,
} from "../reducers/questionReducer";
import type { QuestionType } from "../@types/QuestionsType";

type QuestionsContextReturn = {
  questions: QuestionType[] | null;
  status: Status;
  index: number;
  answer: number | null;
  points: number;
  seconds: number | null;
  maxPoints: number;
  dispatch: React.ActionDispatch<[action: ActionProps]>;
};

const QuestionsContext = createContext<QuestionsContextReturn | null>(null);

const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;

export function QuestionsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [{ questions, answer, index, status, points, seconds }, dispatch] =
    useReducer(questionReducer, {
      questions: null,
      status: "loading",
      index: 0,
      answer: null,
      points: 0,
      seconds: null,
    });
  const maxPoints = questions?.reduce((prev, acc) => prev + acc.points, 0) || 0;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error to get questions.");

        const json = (await response.json()) as QuestionType[];

        dispatch({ type: "getData", payload: json });
      } catch (error: unknown) {
        error instanceof Error
          ? dispatch({ type: "dataFailed" })
          : console.error("Error");
      }
    }

    fetchQuestions();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        answer,
        index,
        status,
        points,
        seconds,
        maxPoints,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestionsContext() {
  const context = useContext(QuestionsContext);
  if (!context) throw new Error("Error in QuestionsContext");
  return context;
}
