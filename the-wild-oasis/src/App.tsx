import { BrowserRouter } from "react-router";
import { Router } from "./router";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryCustomized from "@/ui/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryCustomized}
        onReset={() => window.location.replace("/")}
      >
        <Router />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
