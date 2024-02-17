import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "@src/store/store";
import { ThemeProvider } from "@mui/material";
import { appTheme } from "@src/theme/appTheme";
import { BrowserRouter } from "react-router-dom";
import { ErrorPage } from "@src/view/ErrorPage/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
