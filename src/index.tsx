import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link, useHistory } from "react-router-dom";
// import "./index.css";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { blueGrey, orange } from "@material-ui/core/colors";
import CssBaseline from "@material-ui/core/CssBaseline";
import App from "./components/app";
import reportWebVitals from "./reportWebVitals";

import "fontsource-roboto";

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: orange,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
