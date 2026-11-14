import { useState } from "react";

// State can hold any value - here a boolean that switches the panel's look.
function ThemeToggle() {
  const [dark, setDark] = useState(false);
  return (
    <div className={dark ? "panel dark" : "panel"}>
      <p>Current theme: <strong>{dark ? "Dark" : "Light"}</strong></p>
      <button onClick={() => setDark(!dark)}>Toggle theme</button>
    </div>
  );
}
export default ThemeToggle;
