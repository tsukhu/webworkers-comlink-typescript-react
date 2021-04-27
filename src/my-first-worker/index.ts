import { expose } from "comlink";
import {
  longAppInitialization,
  longBlockingAddition,
} from "../blockingTasks";
import { getSentimentScore, initModel } from "../components/tensor/tensorFlowWorker";
const exports = {
  longAppInitialization,
  longBlockingAddition,
  getSentimentScore,
  initModel,
};
export type MyFirstWorker = typeof exports;

expose(exports);
