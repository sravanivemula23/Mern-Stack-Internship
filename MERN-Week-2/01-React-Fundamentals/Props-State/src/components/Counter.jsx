import { useState } from "react";

// STATE: data owned by this component. Changing it with setCount re-renders the UI.
// The `step` value is a PROP (set by the parent), `count` is STATE (changes here).
function Counter({ step = 1 }) {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <p className="count">{count}</p>
      <button onClick={() => setCount(count - step)}>− {step}</button>
      <button onClick={() => setCount(count + step)}>+ {step}</button>
      <button className="reset" onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
export default Counter;
