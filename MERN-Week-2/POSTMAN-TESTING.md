# Postman Testing Guide (Week 2)

## Quick way: import the ready-made collections
1. Open Postman → **Import** → select the three files in the `postman/` folder.
2. Start the matching server (`npm start`) and make sure MongoDB is running.
3. Open the collection → **Run** → **Run collection**. Every request has a status-code test.

Run the requests **in order**. The first requests save `{{token}}` and `{{id}}` automatically.

| Collection | Server port | Base URL |
|---|---|---|
| Todo REST API | 5000 | `http://localhost:5000` |
| Authentication API | 5001 | `http://localhost:5001` |
| Notes App Backend | 5002 | `http://localhost:5002` |

## Manual testing steps (any request)
1. Pick the method (GET / POST / PUT / DELETE) and enter the URL.
2. For POST/PUT: **Body → raw → JSON** and paste the sample body. Postman adds `Content-Type: application/json`.
3. For protected routes: **Authorization → Bearer Token** and paste the token from login/register.
4. Click **Send** and compare the status code and body with the tables below.

---

## 1. Todo REST API (port 5000)

| # | Endpoint | Method | Headers | Body | Expected |
|---|---|---|---|---|---|
| 1 | `/api/tasks` | POST | Content-Type: application/json | `{"title":"Buy groceries","description":"Milk, eggs"}` | **201**, `success:true`, task with `_id`, `completed:false` |
| 2 | `/api/tasks` | POST | same | `{"description":"no title"}` | **400** (Title is required) |
| 3 | `/api/tasks` | GET | none | none | **200**, `count` and `data` array |
| 4 | `/api/tasks/:id` | GET | none | none | **200**, the task |
| 5 | `/api/tasks/abc` | GET | none | none | **400** (invalid id) |
| 6 | `/api/tasks/:id` | PUT | Content-Type: application/json | `{"title":"Buy groceries","completed":true}` | **200**, updated task |
| 7 | `/api/tasks/:id` | DELETE | none | none | **200**, task deleted |
| 8 | `/api/tasks/:id` | GET (after delete) | none | none | **404** |

## 2. Authentication API (port 5001)

| # | Endpoint | Method | Headers | Body | Expected |
|---|---|---|---|---|---|
| 1 | `/api/auth/register` | POST | Content-Type: application/json | `{"name":"Sravani","email":"sravani@example.com","password":"secret123"}` | **201**, `token` + `user` (no password) |
| 2 | `/api/auth/register` | POST | same | same email again | **409** Email already registered |
| 3 | `/api/auth/register` | POST | same | `{"name":"X","email":"x@example.com","password":"123"}` | **400** password too short |
| 4 | `/api/auth/login` | POST | same | `{"email":"sravani@example.com","password":"secret123"}` | **200**, `token` |
| 5 | `/api/auth/login` | POST | same | wrong password | **401** Invalid email or password |
| 6 | `/api/auth/me` | GET | Authorization: Bearer `<token>` | none | **200**, current user |
| 7 | `/api/auth/me` | GET | none | none | **401** Not authorized, no token |

Sample success response (register):
```json
{ "success": true, "token": "eyJhbGciOi...", "user": { "id": "6af7...", "name": "Sravani", "email": "sravani@example.com" } }
```

## 3. Notes App Backend (port 5002)

Register or log in first (same endpoints as above, on port 5002), then use the token on every notes request.

| # | Endpoint | Method | Headers | Body | Expected |
|---|---|---|---|---|---|
| 1 | `/api/notes` | POST | Authorization: Bearer `<token>`, Content-Type: application/json | `{"title":"Shopping","content":"Milk, eggs"}` | **201**, note with `user`, `_id` |
| 2 | `/api/notes` | POST | same | `{"title":"No content"}` | **400** Content is required |
| 3 | `/api/notes` | GET | Authorization | none | **200**, only YOUR notes |
| 4 | `/api/notes/:id` | GET | Authorization | none | **200**, the note |
| 5 | `/api/notes/:id` | PUT | Authorization, Content-Type | `{"title":"Shopping list","content":"Milk, eggs, bread"}` | **200**, updated note |
| 6 | `/api/notes/:id` | DELETE | Authorization | none | **200**, Note deleted |
| 7 | `/api/notes` | GET | none | none | **401** Not authorized, no token |
| 8 | `/api/notes/abc` | GET | Authorization | none | **400** Invalid note id |
| 9 | `/api/notes/:id` (another user's note) | GET/PUT/DELETE | Authorization of a different user | any | **404** (users cannot see each other's notes) |

Sample error response:
```json
{ "success": false, "message": "Not authorized, no token" }
```

**Test 9 in Postman:** register a second user, copy that user's token, and request the first user's note id. You should get 404.
