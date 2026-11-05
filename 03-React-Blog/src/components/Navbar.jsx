function Navbar({ title }) {
  return (
    <header className="navbar">
      <h1>{title}</h1>
      <nav><a href="#">Home</a><a href="#">Posts</a><a href="#">About</a></nav>
    </header>
  );
}
export default Navbar;
