const form = document.getElementById("signup");
const fields = {
  username: (v) => (v.length >= 3 ? "" : "Username must be at least 3 characters."),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email address."),
  password: (v) =>
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) ? "" : "Min 8 characters with a letter and a number.",
  confirm: (v) => (v === form.password.value && v ? "" : "Passwords do not match."),
};

function validate(id) {
  const input = document.getElementById(id);
  const msg = fields[id](input.value.trim());
  const box = input.parentElement;
  box.classList.toggle("error", !!msg);
  box.classList.toggle("success", !msg);
  box.querySelector("small").textContent = msg;
  return !msg;
}

Object.keys(fields).forEach((id) =>
  document.getElementById(id).addEventListener("input", () => validate(id))
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const ok = Object.keys(fields).map(validate).every(Boolean);
  document.getElementById("success").textContent = ok ? "Registration successful!" : "";
  if (ok) form.reset();
});
