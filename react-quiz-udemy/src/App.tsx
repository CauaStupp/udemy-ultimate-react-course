import { useEffect, useReducer } from "react";
import { Header } from "./components/Header";
import { Questions } from "./components/Questions";
import { questionReducer } from "./reducers/questionReducer";
import { StartQuiz } from "./components/StartQuiz";
import type { QuestionType } from "./@types/QuestionsType";
import { Loading } from "./utils/Loading";
import { ErrorComponent } from "./utils/Error";
import { Progress } from "./components/Progress";
import { Footer } from "./components/Footer";
import { FinishQuiz } from "./components/FinishQuiz";
import { NextButton } from "./components/NextButton";
import { Timer } from "./components/Timer";

const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;

function App() {
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
          ? dispatch({ type: "dataFailed", payload: null })
          : console.error("Error");
      }
    }

    fetchQuestions();
  }, []);

  return (
    <>
      <Header />
      <main className="container">
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && (
          <StartQuiz quizCount={questions?.length} dispatch={dispatch} />
        )}
        {questions && status === "active" && seconds && (
          <>
            <Progress
              maxValue={questions.length}
              value={index}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Questions
              key={index}
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timer={seconds} />
              <NextButton
                answer={answer}
                count={questions.length}
                index={index}
                dispatch={dispatch}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishQuiz
            maxPoints={maxPoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </main>
    </>
  );
}

export default App;
