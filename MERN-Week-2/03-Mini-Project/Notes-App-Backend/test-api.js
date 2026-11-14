// Smoke test: run the server first (npm start), then:  node test-api.js
const BASE = process.env.BASE_URL || "http://localhost:5002";
let pass = 0, fail = 0;
const check = (name, cond, extra = "") => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"}  ${name} ${cond ? "" : extra}`); };
const call = async (method, path, body, token) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(BASE + path, { method, headers, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, body: await res.json() };
};
const signup = async (name) => {
  const r = await call("POST", "/api/auth/register", { name, email: `${name}${Date.now()}@example.com`, password: "secret123" });
  return r.body.token;
};

(async () => {
  const alice = await signup("alice");
  const bob = await signup("bob");

  let r = await call("GET", "/api/notes");
  check("Notes without token -> 401", r.status === 401);
  r = await call("POST", "/api/notes", { title: "Shopping", content: "Milk, eggs" }, alice);
  check("Create note (201)", r.status === 201 && r.body.data.title === "Shopping", JSON.stringify(r));
  const id = r.body.data._id;
  r = await call("POST", "/api/notes", { title: "No content" }, alice);
  check("Create note without content -> 400", r.status === 400, JSON.stringify(r));
  r = await call("GET", "/api/notes", null, alice);
  check("Alice sees her note", r.status === 200 && r.body.count === 1);
  r = await call("GET", "/api/notes", null, bob);
  check("Bob sees none of Alice's notes", r.status === 200 && r.body.count === 0, JSON.stringify(r));
  r = await call("GET", `/api/notes/${id}`, null, alice);
  check("Alice gets note by id (200)", r.status === 200 && r.body.data._id === id);
  r = await call("GET", `/api/notes/${id}`, null, bob);
  check("Bob cannot read Alice's note -> 404", r.status === 404);
  r = await call("PUT", `/api/notes/${id}`, { title: "Hacked", content: "x" }, bob);
  check("Bob cannot update Alice's note -> 404", r.status === 404);
  r = await call("DELETE", `/api/notes/${id}`, null, bob);
  check("Bob cannot delete Alice's note -> 404", r.status === 404);
  r = await call("PUT", `/api/notes/${id}`, { title: "Shopping list", content: "Milk, eggs, bread" }, alice);
  check("Alice updates note (200)", r.status === 200 && r.body.data.content === "Milk, eggs, bread", JSON.stringify(r));
  r = await call("GET", "/api/notes/abc", null, alice);
  check("Invalid id -> 400", r.status === 400);
  r = await call("DELETE", `/api/notes/${id}`, null, alice);
  check("Alice deletes note (200)", r.status === 200);
  r = await call("GET", `/api/notes/${id}`, null, alice);
  check("Deleted note -> 404", r.status === 404);
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
