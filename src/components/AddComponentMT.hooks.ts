import { useEffect, useState } from "react";
import { longBlockingAddition } from "../blockingTasks";
/**
 * Our hook that performs the calculation on the worker
 */
export function useTakeALongTimeToAddTwoNumbers(
  number1: number,
  number2: number
) {
  // We'll want to expose a wrapping object so we know when a calculation is in progress
  const [data, setData] = useState({
    isCalculating: true,
    total: undefined as number | undefined,
  });

  // -------- Start Main Thread code ---------
  useEffect(() => {
    // We're starting the calculation here
    setData({ isCalculating: true, total: undefined });
    const total = longBlockingAddition(number1, number2);
    setData({ isCalculating: false, total }); // We receive the result here
  }, [setData, number1, number2]);
  // -------- End Main Thread code ---------

  return data;
}

