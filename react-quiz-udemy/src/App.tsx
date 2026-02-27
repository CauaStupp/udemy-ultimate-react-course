import { Header } from "./components/Header";
import { Questions } from "./components/Questions";
import { StartQuiz } from "./components/StartQuiz";
import { Loading } from "./utils/Loading";
import { ErrorComponent } from "./utils/Error";
import { Progress } from "./components/Progress";
import { Footer } from "./components/Footer";
import { FinishQuiz } from "./components/FinishQuiz";
import { NextButton } from "./components/NextButton";
import { Timer } from "./components/Timer";
import { useQuestionsContext } from "./contexts/questionsContext";

function App() {
  const { status, questions, seconds } = useQuestionsContext();

  return (
    <>
      <Header />
      <main className="container">
        {status === "loading" && <Loading />}
        {status === "error" && <ErrorComponent />}
        {status === "ready" && <StartQuiz />}
        {questions && status === "active" && seconds && (
          <>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishQuiz />}
      </main>
    </>
  );
}

export default App;
