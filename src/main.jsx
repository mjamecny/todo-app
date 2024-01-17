import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import GlobalStyles from "./styles/GlobalStyles.js"
import { TodosProvider } from "./contexts/TodosContext.jsx"
import { DarkModeProvider } from "./contexts/DarkModeContext.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DarkModeProvider>
      <TodosProvider>
        <App />
        <GlobalStyles />
      </TodosProvider>
    </DarkModeProvider>
  </React.StrictMode>
)
