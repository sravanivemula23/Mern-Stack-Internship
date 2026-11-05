function SearchBar({ value, onChange }) {
  return (
    <input
      type="search"
      className="search"
      placeholder="Search posts by title or content..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search posts"
    />
  );
}
export default SearchBar;
