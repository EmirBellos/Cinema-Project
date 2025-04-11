import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.jsx";
import { ListMoviesContextProvider } from "./Context/ListMoviesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ListMoviesContextProvider>
      <App />
    </ListMoviesContextProvider>
  </StrictMode>
);
