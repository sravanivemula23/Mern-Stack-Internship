function Header({ title, links = [] }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      <nav>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`}>{l}</a>
        ))}
      </nav>
    </header>
  );
}
export default Header;
