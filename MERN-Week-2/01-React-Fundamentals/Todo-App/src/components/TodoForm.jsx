import { useState } from "react";

function TodoForm({ onAdd }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent empty (or whitespace-only) tasks
    if (!text.trim()) {
      setError("Please enter a task before adding.");
      return;
    }
    onAdd(text.trim());
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="todo-form-row">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          aria-label="New task"
        />
        <button type="submit">Add</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
export default TodoForm;
