import React, { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import padSequences from "./paddingSequence";

const TensorAppMT = () => {
  const url = {
    model:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
    metadata:
      "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
  };

  const OOV_INDEX = 2;

  const [metadata, setMetadata] = useState<any>();
  const [model, setModel] = useState<any>();
  const [testText, setText] = useState("");
  const [testScore, setScore] = useState("");
  const [trimedText, setTrim] = useState("");
  const [seqText, setSeq] = useState("");
  const [padText, setPad] = useState<any>("");
  const [inputText, setInput] = useState<any>("");

  async function loadModel(url: any) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMetadata(url: any) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }

  const getSentimentScore = (text: any) => {
    console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|\\,|\\!)/g, "")
      .split(" ");
    setTrim(inputText);
    console.log(inputText);
    const sequence = inputText.map((word: any) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    console.log(sequence);
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    console.log(metadata.max_len);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    console.log(input);
    setInput(input);
    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setScore(score);
    return score;
  };

  useEffect(() => {
    tf.ready().then(async () => {
      await loadModel(url);
      await loadMetadata(url);
    });
  }, []);

  return (
    <div style={{ width: "100%", display: "block" }}>
      <div
        style={{
          display: "flex",
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
          <h3>TensorflowJS Test (Without Web Worker)</h3>
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
              onClick={() => getSentimentScore(testText)}
            >
              Calculate
            </button>
          ) : (
            <></>
          )}
        </div>
        <div style={{ margin: "1rem", width: "100%" }}>
          {testScore !== "" ? (
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
                {inputText.toString()}
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

export default TensorAppMT;
