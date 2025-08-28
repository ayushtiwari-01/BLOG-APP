import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary";
import axios from "axios";

// Configure Axios base URL from environment for production (Vercel)
// Prefer Vite-style var; fallback to CRA-style; default to empty for local proxy
axios.defaults.baseURL = process.env.VITE_API_URL || process.env.REACT_APP_API_BASE_URL || "";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>
);


