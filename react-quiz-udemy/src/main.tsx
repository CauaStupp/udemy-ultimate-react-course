import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QuestionsContextProvider } from "./contexts/questionsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QuestionsContextProvider>
      <App />
    </QuestionsContextProvider>
  </StrictMode>,
);
