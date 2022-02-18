import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Context from "./components/context/Context"

ReactDOM.render(
  <Context>
    <App />
  </Context>,
  document.getElementById('root')
);
