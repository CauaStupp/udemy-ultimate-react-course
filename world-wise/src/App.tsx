import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { Providers } from "./utils/Providers";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Providers>
        <Router />
      </Providers>
    </BrowserRouter>
  );
}

export default App;
