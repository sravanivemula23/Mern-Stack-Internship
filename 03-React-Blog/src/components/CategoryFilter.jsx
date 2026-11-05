function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="filters">
      {categories.map((c) => (
        <button key={c} className={c === selected ? "chip active" : "chip"} onClick={() => onSelect(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}
export default CategoryFilter;
