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

const API_URL = `https://mabdurahman.github.io/questions-api/data/reactjs-questions.json`;

function App() {
  const [{ questions, answer, index, status, points }, dispatch] = useReducer(
    questionReducer,
    {
      questions: null,
      status: "loading",
      index: 0,
      answer: null,
      points: 0,
    },
  );

  const maxPoints = questions?.reduce((prev, acc) => prev + acc.points, 0) || 0;

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error to get questions.");

        const json = (await response.json()) as QuestionType[];

        console.log(json);

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
        {questions && status === "active" && (
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
            <Footer
              dispatch={dispatch}
              answer={answer}
              count={questions.length}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishQuiz maxPoints={maxPoints} points={points} />
        )}
      </main>
    </>
  );
}

export default App;
