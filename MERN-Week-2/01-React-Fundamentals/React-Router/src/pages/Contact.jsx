import { useState } from "react";

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section>
      <h1>Contact</h1>
      {sent ? (
        <p className="ok">Thanks! Your message was sent.</p>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
          <label>Name<input required /></label>
          <label>Email<input type="email" required /></label>
          <label>Message<textarea rows="4" required /></label>
          <button type="submit">Send</button>
        </form>
      )}
    </section>
  );
}
export default Contact;
