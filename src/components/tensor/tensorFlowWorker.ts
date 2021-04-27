import * as tf from "@tensorflow/tfjs";
import padSequences from "./paddingSequence";

const OOV_INDEX = 2;
let model: any;
let metadata: any;
async function loadModel(url: any) {
  try {
    return await tf.loadLayersModel(url.model);
  } catch (err) {
    console.log(err);
  }
}

async function loadMetadata(url: any) {
  try {
    const metadataJson = await fetch(url.metadata);
    return await metadataJson.json();
  } catch (err) {
    console.log(err);
  }
}

async function process(text: string, url: any) {
  console.log(model, metadata);
  if (!model || !metadata) {
   await initModel(url);
  }
  const inputText = text
    .trim()
    .toLowerCase()
    .replace(/(\.|\\,|\\!)/g, "")
    .split(" ");

  const sequence = inputText.map((word: any) => {
    let wordIndex = metadata.word_index[word] + metadata.index_from;
    if (wordIndex > metadata.vocabulary_size) {
      wordIndex = OOV_INDEX;
    }
    return wordIndex;
  });
  // Perform truncation and padding.
  const paddedSequence = padSequences([sequence], metadata.max_len);
  console.log(metadata.max_len);

  const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
  console.log(input);

  const predictOut = model.predict(input);
  const score = predictOut.dataSync()[0];
  predictOut.dispose();
  return {
    testScore: score,
    trimedText: inputText,
    seqText: sequence,
    padText: paddedSequence,
    inputText: input.toString(),
    url,
  };
}

export const initModel = async (url: any) => {
  model = await loadModel(url);
  metadata = await loadMetadata(url);
};

export const getSentimentScore = async (text: string,url: any) => {
  console.log("worker called");
  return process(text,url);
};
