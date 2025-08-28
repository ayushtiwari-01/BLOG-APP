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
// Use CRA-style env var for production, fallback to empty for local proxy
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "";
axios.defaults.baseURL = apiBaseUrl;

// Log the base URL for debugging (remove in production)
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Base URL:', apiBaseUrl || 'Using CRA proxy (localhost:8080)');
}

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


