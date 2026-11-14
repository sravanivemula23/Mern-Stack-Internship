import { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";

function App() {
  // The whole list is state: adding/deleting creates a NEW array (never mutate state).
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React state", done: true },
    { id: 2, text: "Build the To-Do app", done: false },
  ]);

  const addTodo = (text) => setTodos([...todos, { id: Date.now(), text, done: false }]);
  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));
  const toggleTodo = (id) => setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const remaining = todos.filter((t) => !t.done).length;

  return (
    <main className="app">
      <h1>My To-Do List</h1>
      <TodoForm onAdd={addTodo} />
      <ul className="todo-list">
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} onDelete={deleteTodo} onToggle={toggleTodo} />
        ))}
      </ul>
      {todos.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
      <p className="summary">{remaining} of {todos.length} tasks remaining</p>
    </main>
  );
}
export default App;
