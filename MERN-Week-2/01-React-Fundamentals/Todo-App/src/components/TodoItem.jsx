function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li className={todo.done ? "todo-item done" : "todo-item"}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span>{todo.text}</span>
      </label>
      <button className="delete" onClick={() => onDelete(todo.id)} aria-label={`Delete ${todo.text}`}>
        Delete
      </button>
    </li>
  );
}
export default TodoItem;
