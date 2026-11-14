import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section>
      <h1>404 - Page not found</h1>
      <Link to="/" className="cta">Back to Home</Link>
    </section>
  );
}
export default NotFound;
