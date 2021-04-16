import React, { useState } from "react";
import "./App.css";
import { useTakeALongTimeToAddTwoNumbers } from "./App.hooks";

// Hook
// T is a generic type for value parameter, our case this will be string
function useDebounce<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const App: React.FC = () => {
  const [number1, setNumber1] = useState(1);
  const [number2, setNumber2] = useState(2);
  const debouncedNumber1 = useDebounce<any>(number1, 500);
  const debouncedNumber2 = useDebounce<any>(number2, 500);
  const total = useTakeALongTimeToAddTwoNumbers(
    debouncedNumber1,
    debouncedNumber2
  );

  return (
    <div className="App">
      <h1>Web Workers in action!</h1>
      <div className="container">
        <div className="path">
          <span id="elem" className="shape trail"></span>
        </div>
      </div>
      <div>
        <label>Number to add: </label>
        <input
          type="number"
          onChange={(e) => setNumber1(parseInt(e.target.value))}
          value={number1}
        />
      </div>
      <div>
        <label>Number to add: </label>
        <input
          type="number"
          onChange={(e) => setNumber2(parseInt(e.target.value))}
          value={number2}
        />
      </div>
      <h2>
        Total:{" "}
        {total.isCalculating ? (
          <em>Calculating...</em>
        ) : (
          <strong>{total.total}</strong>
        )}
      </h2>
    </div>
  );
};

export default App;
