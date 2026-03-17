import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { CssBaseline } from "@mui/material"
import store from "./app/store"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)