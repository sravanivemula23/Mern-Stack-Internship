import { Link } from "react-router-dom";

function Home() {
  return (
    <section>
      <h1>Welcome Home</h1>
      <p>This app demonstrates multi-page navigation with React Router, with no page reloads.</p>
      <Link to="/about" className="cta">Learn more about us</Link>
    </section>
  );
}
export default Home;
