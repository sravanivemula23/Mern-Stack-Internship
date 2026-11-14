// PROPS: data passed in by the parent. Read-only inside this component.
function Greeting({ name, role }) {
  return (
    <p className="greeting">
      Hello, <strong>{name}</strong>! You are learning <em>{role}</em>.
    </p>
  );
}
export default Greeting;
