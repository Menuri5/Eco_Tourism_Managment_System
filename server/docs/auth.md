# EcoLanka API: Auth Module

Base URL (local): `http://localhost:5000`

## Roles
Stored in `profiles.user_type`: `tourist` (default), `admin`, `system_manager`.

## Authentication
Protected routes need this header (token **without quotes**):
```
Authorization: Bearer <access_token>
```
Access tokens expire after 1 hour. Log in again to get a new one.

---

## Endpoints

### POST `/api/auth/register`  (public)
Body:
```json
{ "name": "Nimsara Perera", "email": "user@gmail.com", "password": "Test1234", "country": "Sri Lanka" }
```
- `201`: `{ "message": "Registration successful. Please check your email...", "userId": "<uuid>" }`
- `400`: `{ "error": "..." }` (missing fields, invalid email, user already exists)

The user must verify the email before logging in.

### POST `/api/auth/login`  (public)
Body:
```json
{ "email": "user@gmail.com", "password": "Test1234" }
```
- `200`: `{ "message": "Login successful", "session": { "access_token": "...", "refresh_token": "...", "expires_in": 3600 }, "user": { "id", "name", "email", "country", "user_type", "created_at" } }`
- `401`: `{ "error": "Invalid login credentials" }` or `"Email not confirmed"`

### POST `/api/auth/logout`  (any logged-in user)
Header: `Authorization: Bearer <access_token>`
- `200`: `{ "message": "Logged out successfully" }`
- `401`: `{ "error": "Access token required" }` or `"Invalid or expired token"`

### GET `/api/auth/me`  (any logged-in user)
Header: `Authorization: Bearer <access_token>`
- `200`: `{ "user": { "id", "name", "email", "country", "user_type", "created_at" } }`
- `401`: missing or invalid token
### GET `/api/profile`  (logged-in user)
Header: `Authorization: Bearer <access_token>`
- `200`: `{ "user": { "id", "name", "email", "country", "user_type", "preferences", "avatar_url", "created_at" } }`

### PUT `/api/profile`  (logged-in user)
Header: `Authorization: Bearer <access_token>`
Body (any of): `{ "name": "...", "country": "...", "preferences": ["wildlife"], "avatar_url": "https://..." }`
- `200`: `{ "message": "Profile updated", "user": {...} }`
- `400`: no valid fields, empty name, or preferences not an array
- Role (`user_type`) and email cannot be changed here.
### GET `/api/auth/admin-only`  (admin only, test route)
- `200`: `{ "message": "Welcome, admin!" }`
- `403`: `{ "error": "Forbidden: insufficient permissions" }`

---

## Status codes
| Code | Meaning |
|---|---|
| 200 / 201 | Success / created |
| 400 | Bad request (validation) |
| 401 | Not logged in, or token invalid/expired |
| 403 | Logged in but role not allowed |
| 500 | Server error |

## Protecting your own routes (for teammates)
```javascript
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// any logged-in user
router.get('/favourites', verifyToken, handler);

// admin only
router.post('/destinations', verifyToken, checkRole('admin'), handler);

// admin or system manager
router.get('/stats', verifyToken, checkRole('admin', 'system_manager'), handler);
```
Inside the handler, the logged-in user is available as `req.user` (`id`, `name`, `email`, `user_type`, ...).

## Setup
1. `cd server && npm install`
2. Copy `.env.example` to `.env` and fill in `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (ask the project owner; never commit `.env`).
3. `npx nodemon server.js`

## Planned (not built yet)
Password reset, profile update, token refresh, admin user management (list/search/suspend/restore).