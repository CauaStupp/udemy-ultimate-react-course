import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <main className="container">
        <Router />
      </main>
    </BrowserRouter>
  );
}

export default App;
