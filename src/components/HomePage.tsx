import * as React from "react";

const HomePage: React.FC<any> = (props) => {
  return (
    <div className="container">
      <h3>Welcome to the Web Worker Experiments</h3>
      <div className="row">
        <div className="column">
          <p>
            <strong>
              There are two stages where web workers can be utilized
            </strong>
          </p>
          <ol>
            <li>
              <b>App Initialization</b>
              <ul>Analytics setup</ul>
              <ul>monitoring configuration</ul>
              <ul>3rdparty configuration</ul>
            </li>
            <li>
              <b>App Execution</b>
              <ul>Resource intensive processing</ul>
              <ul>Off loading monitoring tasks</ul>
              <ul>Images, Gaming, Analytics, Data Transformation etc.</ul>
            </li>
          </ol>
        </div>
        <div className="column">
        <blockquote>
          <p>
            The application tries to cover both stages and demonstrates the user
            experience and reliability that can be achieved where ever
            applicable.
          </p>
          <p>
            The sliding animation is to provide a visual experience of how
            blocking the main thread effects the user experience. Also the FPS
            counter is another indicator for the same. What it dip in case of
            blocking transactions
          </p>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
