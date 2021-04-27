import { wrap, releaseProxy } from "comlink";
import { useEffect, useState, useMemo } from "react";
/**
 * Our hook that performs the calculation on the worker
 */
export function useSentimentScore(text: string) {
  const url = useMemo(
    () => ({
      model:
        "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json",
      metadata:
        "https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json",
    }),
    []
  );

  // We'll want to expose a wrapping object so we know when a calculation is in progress
  const [data, setData] = useState<any>({
    isPredicting: false,
    testScore: "",
    trimedText: "",
    seqText: "",
    padText: "",
    inputText: "",
    url: {},
  });

  // -------- Start Web Worker Thread code ---------
  // acquire our worker
  const { workerApi } = useWorker();

  /*   useEffect(() => {
    workerApi.initModel();
  }, [workerApi]); */

  useEffect(() => {
    if (text.length === 0) return;
    // We're starting the calculation here
    setData({ isPredicting: true });
    workerApi.getSentimentScore(text, url).then((data: any) => {
      if (data) {
        setData({ isPredicting: false, ...data });
      }
    }); // We receive the result here
  }, [workerApi, setData, text, url]);

  // -------- End Web Worker Thread code ---------

  return data;
}

function useWorker() {
  // memoise a worker so it can be reused; create one worker up front
  // and then reuse it subsequently; no creating new workers each time
  const workerApiAndCleanup = useMemo(() => makeWorkerApiAndCleanup(), []);

  useEffect(() => {
    const { cleanup } = workerApiAndCleanup;

    // cleanup our worker when we're done with it
    return () => {
      cleanup();
    };
  }, [workerApiAndCleanup]);

  return workerApiAndCleanup;
}

/**
 * Creates a worker, a cleanup function and returns it
 */
function makeWorkerApiAndCleanup() {
  // Here we create our worker and wrap it with comlink so we can interact with it
  const worker = new Worker("../../my-first-worker", {
    name: "my-first-worker",
    type: "module",
  });
  const workerApi = wrap<import("../../my-first-worker").MyFirstWorker>(worker);

  // A cleanup function that releases the comlink proxy and terminates the worker
  const cleanup = () => {
    workerApi[releaseProxy]();
    worker.terminate();
  };

  const workerApiAndCleanup = { workerApi, cleanup };

  return workerApiAndCleanup;
}
