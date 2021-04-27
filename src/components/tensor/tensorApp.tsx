import React, { useState } from "react";
import { useSentimentScore } from "./tensorAppHooks";

const TensorApp = () => {
  const [testText, setText] = useState("");
  const [predictionText, setPredictionText] = useState("");
  const {
    isPredicting,
    url,
    inputText,
    padText,
    seqText,
    trimedText,
    testScore,
  } = useSentimentScore(predictionText);

  return (
    <div style={{ width: '100%' , display: 'block'}}>
      <div
        style={{
          display: 'flex',
          border: "2px solid gray",
          width: "100%",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            margin: "1rem",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h3>TensorflowJS Test (Web Worker)</h3>
          <label htmlFor="standard-read-only-input">
            Type your sentences here
          </label>
          <textarea
            id="standard-read-only-input"
            placeholder="Type your sentences here"
            onChange={(e) => setText(e.target.value)}
            value={testText}
          />
          <br />
          <br />
          {testText !== "" ? (
            <button
              style={{ width: "20vh", height: "5vh" }}
              onClick={() => setPredictionText(testText)}
            >
              Calculate
            </button>
          ) : (
            <></>
          )}
        </div>
        <div style={{ margin: "1rem", width: "100%" }}>
          {isPredicting && <p>Predicting ...</p>}
          {!isPredicting && testScore !== "" ? (
            <>
              <p>Whats going on:</p>
              <h5 style={{ color: "blue" }}>{testScore}</h5>
              <br />
              <p>1 = Positive, 0 = Negative</p>
              <br />
              <p>Trimmed the input text:</p>
              <br />
              <p style={{ color: "green", width: "150px" }}>
                {" "}
                {trimedText.toString()}
              </p>
              <br />
              <p>Map vocab to words: </p>
              <br />
              <p style={{ color: "green" }}> {seqText.toString()}</p>
              <br />
              <p>Fix the length:</p>
              <br />
              <p
                style={{
                  color: "green",
                  wordWrap: "break-word",
                  width: "150px",
                }}
              >
                {padText.toString()}
              </p>
              <br />
              <p>Input to tf:</p>
              <br />
              <p
                style={{
                  color: "green",
                  wordWrap: "break-word",
                  width: "150px",
                }}
              >
                {inputText}
              </p>
              <br />
              <a href={url.model}>Model Link</a>
              <br />
              <a href={url.metadata}>Model Metadata</a>

              <br />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TensorApp;
