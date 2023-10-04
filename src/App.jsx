import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Router />
    </BrowserRouter>
  );
}

export default App;
