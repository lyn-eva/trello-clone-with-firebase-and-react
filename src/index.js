import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Context from "./components/context/Context";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>,
  document.getElementById("root")
);
