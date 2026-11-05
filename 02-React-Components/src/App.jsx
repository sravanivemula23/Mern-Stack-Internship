import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Button from "./components/Button";
import Form from "./components/Form";

const cards = [
  { id: 1, title: "Props", tag: "Concept", description: "Props let a parent component pass data down to children, making components reusable and configurable." },
  { id: 2, title: "State", tag: "Concept", description: "State stores data that changes over time. Updating state with useState re-renders the component." },
  { id: 3, title: "Events", tag: "Concept", description: "React handles events like onClick and onChange using camelCase props and handler functions." },
];

function App() {
  const [count, setCount] = useState(0);
  const [submissions, setSubmissions] = useState([]);

  return (
    <>
      <Header title="React Components" links={["Cards", "Counter", "Form"]} />
      <main className="container">
        <section id="cards">
          <h2>Cards (props + state)</h2>
          <div className="grid">
            {cards.map((c) => (
              <Card key={c.id} {...c} />
            ))}
          </div>
        </section>

        <section id="counter">
          <h2>Buttons (reusable + events)</h2>
          <p className="count">Count: {count}</p>
          <div className="row">
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button variant="outline" onClick={() => setCount(count - 1)}>Decrement</Button>
            <Button variant="danger" onClick={() => setCount(0)} disabled={count === 0}>Reset</Button>
          </div>
        </section>

        <section id="form">
          <h2>Form (controlled inputs)</h2>
          <Form onSubmit={(v) => setSubmissions([...submissions, v])} />
          {submissions.length > 0 && (
            <ul className="submissions">
              {submissions.map((s, i) => (
                <li key={i}><strong>{s.name}</strong> ({s.email}): {s.message}</li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <Footer name="Sravani Vemula" />
    </>
  );
}
export default App;
