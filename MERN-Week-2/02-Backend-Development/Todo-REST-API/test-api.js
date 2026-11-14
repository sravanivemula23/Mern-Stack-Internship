// Smoke test: run the server first (npm start), then:  node test-api.js
const BASE = process.env.BASE_URL || "http://localhost:5000";
let pass = 0, fail = 0;
const check = (name, cond, extra = "") => { cond ? pass++ : fail++; console.log(`${cond ? "PASS" : "FAIL"}  ${name} ${cond ? "" : extra}`); };
const call = async (method, path, body) => {
  const res = await fetch(BASE + path, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, body: await res.json() };
};

(async () => {
  let r = await call("POST", "/api/tasks", { title: "Buy milk", description: "2 litres" });
  check("POST /api/tasks creates task (201)", r.status === 201 && r.body.data.title === "Buy milk", JSON.stringify(r));
  const id = r.body.data._id;
  r = await call("POST", "/api/tasks", { description: "no title" });
  check("POST without title -> 400", r.status === 400, JSON.stringify(r));
  r = await call("GET", "/api/tasks");
  check("GET /api/tasks lists tasks (200)", r.status === 200 && r.body.count >= 1);
  r = await call("GET", `/api/tasks/${id}`);
  check("GET /api/tasks/:id (200)", r.status === 200 && r.body.data._id === id);
  r = await call("GET", "/api/tasks/123");
  check("GET invalid id -> 400", r.status === 400);
  r = await call("GET", "/api/tasks/64b7f0f2a1b2c3d4e5f60718");
  check("GET unknown id -> 404", r.status === 404);
  r = await call("PUT", `/api/tasks/${id}`, { title: "Buy milk and eggs", completed: true });
  check("PUT updates task (200)", r.status === 200 && r.body.data.completed === true && r.body.data.title === "Buy milk and eggs", JSON.stringify(r));
  r = await call("PUT", `/api/tasks/${id}`, { title: "" });
  check("PUT with empty title -> 400", r.status === 400, JSON.stringify(r));
  r = await call("DELETE", `/api/tasks/${id}`);
  check("DELETE removes task (200)", r.status === 200);
  r = await call("GET", `/api/tasks/${id}`);
  check("GET deleted task -> 404", r.status === 404);
  r = await call("GET", "/api/unknown");
  check("Unknown route -> 404", r.status === 404);
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
