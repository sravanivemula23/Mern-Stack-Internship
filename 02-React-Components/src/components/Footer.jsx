function Footer({ name, year = new Date().getFullYear() }) {
  return (
    <footer className="footer">
      <p>&copy; {year} {name}. Built with React.</p>
    </footer>
  );
}
export default Footer;
