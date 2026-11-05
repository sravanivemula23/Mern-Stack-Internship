import { useState, useMemo } from "react";
import blogs from "./data/blogs.json";
import Navbar from "./components/Navbar";
import BlogCard from "./components/BlogCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";

const categories = ["All", ...new Set(blogs.map((b) => b.category))];

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter(
      (b) =>
        (category === "All" || b.category === category) &&
        (b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
    );
  }, [query, category]);

  return (
    <>
      <Navbar title="DevBlog" />
      <main className="container">
        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilter categories={categories} selected={category} onSelect={setCategory} />
        <p className="results">{filtered.length} post{filtered.length !== 1 && "s"} found</p>
        <div className="grid">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {filtered.length === 0 && <p className="empty">No posts match your search.</p>}
      </main>
    </>
  );
}
export default App;
