// Smoke test: run the server first (npm start), then:  node test-api.js
const BASE = process.env.BASE_URL || "http://localhost:5001";
let pass = 0, fail = 0;
const check = (name, cond, extra = "") => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"}  ${name} ${cond ? "" : extra}`); };
const call = async (method, path, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, body: await res.json() };
};

(async () => {
  const email = `user${Date.now()}@example.com`;
  let r = await call("POST", "/api/auth/register", { name: "Test User", email, password: "secret123" });
  check("Register (201) returns token, no password", r.status === 201 && !!r.body.token && !JSON.stringify(r.body).includes("secret123"), JSON.stringify(r));
  r = await call("POST", "/api/auth/register", { name: "Test User", email, password: "secret123" });
  check("Duplicate email -> 409", r.status === 409, JSON.stringify(r));
  r = await call("POST", "/api/auth/register", { name: "X", email: "bad-email", password: "secret123" });
  check("Invalid email -> 400", r.status === 400, JSON.stringify(r));
  r = await call("POST", "/api/auth/register", { name: "X", email: "a@b.com", password: "123" });
  check("Short password -> 400", r.status === 400, JSON.stringify(r));
  r = await call("POST", "/api/auth/register", { email });
  check("Missing fields -> 400", r.status === 400);
  r = await call("POST", "/api/auth/login", { email, password: "secret123" });
  check("Login (200) returns token", r.status === 200 && !!r.body.token, JSON.stringify(r));
  const token = r.body.token;
  r = await call("POST", "/api/auth/login", { email, password: "wrongpass" });
  check("Wrong password -> 401", r.status === 401);
  r = await call("POST", "/api/auth/login", { email: "nobody@example.com", password: "secret123" });
  check("Unknown email -> 401", r.status === 401);
  r = await call("GET", "/api/auth/me");
  check("Protected route without token -> 401", r.status === 401);
  r = await call("GET", "/api/auth/me", null, "not.a.token");
  check("Protected route with invalid token -> 401", r.status === 401);
  r = await call("GET", "/api/auth/me", null, token);
  check("Protected route with valid token (200)", r.status === 200 && r.body.user.email === email, JSON.stringify(r));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
