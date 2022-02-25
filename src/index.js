import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Context from "./components/context/Context";
import AuthContext from "./components/context/AuthContext";

ReactDOM.render(
  <BrowserRouter>
    <Context>
      <AuthContext>
        <App />
      </AuthContext>
    </Context>
  </BrowserRouter>,
  document.getElementById("root")
);
