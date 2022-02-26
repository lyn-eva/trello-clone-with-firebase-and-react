import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Context from "./components/context/Context";
import AuthContext from "./components/context/AuthContext";
import DbContext from "./components/context/DbContext"

ReactDOM.render(
  <BrowserRouter>
    <Context>
      <AuthContext>
        <DbContext>
        <App />
        </DbContext>
      </AuthContext>
    </Context>
  </BrowserRouter>,
  document.getElementById("root")
);
