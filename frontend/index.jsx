import React from "react";
// const React = require("react");
import { createRoot } from "react-dom/client";

const App = () => <h1>Hello World</h1>;

createRoot(document.querySelector("#App")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
