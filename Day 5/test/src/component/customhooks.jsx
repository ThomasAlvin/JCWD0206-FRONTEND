import { useState } from "react";

export default function CustomhooksPage() {
  const [count, increment, decrement] = UseCounter(0, 1);
  return (
    <>
      <div>
        <h1>{count}</h1>
        <button onClick={increment}>increment</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </>
  );
}
function UseCounter(val, step) {
  const [count, setCount] = useState(val);
  function increment() {
    setCount(count + step);
  }
  function decrement() {
    setCount(count - step);
  }
  return [count, increment, decrement];
}
