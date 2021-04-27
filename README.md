# React Comlink WebWorker Experiments

- This project experiments with usage of web workers to offload some of the blocking tasks to ensure smooth UI and also to free the main thread to perform other activities smoothly.

- There are a few experiments

  - Initial load - see index.tsx

    - Use case: Initial application initialization - if there are some configurations like analytics initialization which can be offloaded to the web worker this is a good area to start.

  - App Execution
    - Use cases: Blocking Tasks during user interactive forms, TensorFlow offloaded to WebWorker vs running on Main Thread

## Setup

```
yarn
```

## Run With Initial Load Test (Main Thread)

```
yarn start:mt
```

## Run With Initial Load Test (Web Worker)

```
yarn start:ww
```

## License

MIT
