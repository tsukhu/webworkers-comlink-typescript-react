import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


// -------- Start Web Worker Thread code ---------
import { wrap } from "comlink";

function longAppInitialization() {
  const worker = new Worker("./my-first-worker", {
    name: "my-first-worker",
    type: "module",
  });
  const workerApi = wrap<import("./my-first-worker").MyFirstWorker>(worker);
  workerApi.longAppInitialization();
}
// -------- End Web Worker Thread code ---------

console.log(process.env);
if (process.env.REACT_APP_MAIN_INIT) {
  import("./blockingTasks").then((m) => m.longAppInitialization());
}
// -------- Start Main Thread code ---------
if (process.env.REACT_APP_WW_INIT) {
  longAppInitialization();
}
// -------- End Main Thread code --------- 

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
