import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import FPSStats from "react-fps-stats";
import "./App.css";
import TopNav from "./components/TopNav";
import HomePage from "./components/HomePage";
const AddComponent = React.lazy(() => import("./components/AddComponent"));
const AddComponentMT = React.lazy(() => import("./components/AddComponentMT"));
const TensorApp = React.lazy(() => import("./components/tensor/tensorApp"));
const TensorAppMT = React.lazy(() => import("./components/tensor/tensorAppMT"));

const App: React.FC = (props: any) => {
  return (
    <Router>
      <div className="container">
        <TopNav />
        <div className="row row-center">
          <div className="column column-center" style={{ textAlign: "center" }}>
            <h2>Web Workers in action!</h2>
            <div className="path">
              <span id="elem" className="shape trail"></span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route path="/add">
                  <AddComponentMT />
                </Route>
                <Route path="/add-w">
                  <AddComponent />
                </Route>
                <Route path="/sentiment">
                  <TensorAppMT />
                </Route>
                <Route path="/sentiment-w">
                  <TensorApp />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
      <FPSStats />
    </Router>
  );
};

export default App;
