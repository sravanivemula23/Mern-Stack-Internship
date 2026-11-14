import { useState } from "react";
import Greeting from "./components/Greeting";
import Counter from "./components/Counter";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  // State in the PARENT, passed DOWN to a child as props.
  const [name, setName] = useState("Sravani");

  return (
    <main className="container">
      <h1>Props and State</h1>

      <section>
        <h2>1. Props: parent to child</h2>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Type a name" />
        <Greeting name={name || "friend"} role="React" />
        <Greeting name="Reusable component" role="props" />
      </section>

      <section>
        <h2>2. State: data that changes inside a component</h2>
        <div className="row">
          <div><h3>Step 1</h3><Counter /></div>
          <div><h3>Step 5 (prop)</h3><Counter step={5} /></div>
        </div>
        <p className="hint">Each Counter keeps its own independent state.</p>
        <ThemeToggle />
      </section>

      <section>
        <h2>3. Props vs State</h2>
        <table>
          <thead><tr><th></th><th>Props</th><th>State</th></tr></thead>
          <tbody>
            <tr><td>Owned by</td><td>Parent component</td><td>The component itself</td></tr>
            <tr><td>Can the component change it?</td><td>No (read-only)</td><td>Yes, via setState function</td></tr>
            <tr><td>Purpose</td><td>Configure / pass data down</td><td>Remember data that changes over time</td></tr>
            <tr><td>Causes re-render?</td><td>When parent re-renders with new props</td><td>Whenever it is updated</td></tr>
          </tbody>
        </table>
      </section>
    </main>
  );
}
export default App;
