import { NavLink } from "react-router-dom";

// NavLink automatically adds the "active" class to the link matching the current URL.
function Navbar() {
  return (
    <header className="navbar">
      <span className="brand">MyApp</span>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  );
}
export default Navbar;
