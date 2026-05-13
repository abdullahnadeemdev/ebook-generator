# EBook Creator — Changes & Fixes

A full audit of the project was performed covering critical bugs, security vulnerabilities, and production readiness. Every change is documented below.

---

## Critical Bug Fixes

### 1. Password hashing never ran (`backend/models/User.js`)

**Problem:** Two separate bugs in the Mongoose pre-save middleware meant passwords were stored as **plain text** and no user could log in after registering.

- `requiredL: true` was a typo — the `email` field was never validated as required.
- `return next;` and `next;` referenced the function without calling it. The middleware silently exited without hashing the password or advancing the request.

```js
// Before (broken)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next;  // ← not called
  this.password = await bcrypt.hash(this.password, salt);
  next;  // ← not called
});

// After (fixed)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```

---

### 2. PDF export was completely broken (`backend/controller/exportController.js`)

**Problem:** A global `const doc = new PDFDocument()` was created at the top of the file. The `exportAsPDF` function created a local variable named `docs` but then called `doc.pipe(res)` and `doc.end()` — using the **global stale instance**, not the one configured for the request. Every PDF download sent an empty/corrupt file.

```js
// Before (broken) — global doc piped, not the local docs
const doc = new PDFDocument(); // ← stale global
const exportAsPDF = async (req, res) => {
  const docs = new PDFDocument({ margins: ... }); // ← correct one, never used
  doc.pipe(res);   // ← wrong variable
  doc.end();       // ← wrong variable
};

// After (fixed) — global removed, local doc used correctly
const exportAsPDF = async (req, res) => {
  const doc = new PDFDocument({ margins: ... });
  doc.pipe(res);
  doc.end();
};
```

---

### 3. Additional bugs in `exportController.js` (15 total)

All of these caused silent failures or corrupt output in both PDF and DOCX export:

| Bug | Fix |
|-----|-----|
| `"haeding_open"` typo | `"heading_open"` |
| `token.length` | `tokens.length` |
| `new textRuns({...})` | `new TextRun({...})` |
| `italics: currentFormatting, italic,` (syntax error) | `italics: isItalic` |
| `textbuffer` vs `textBuffer` variable name mismatch | Unified to `textBuffer` |
| `orderedCouner` typo | `orderedCounter` |
| `token[i + 1]` | `tokens[i + 1]` |
| `"paragaph_open"` typo | `"paragraph_open"` |
| Duplicate `before:` key in spacing object | Removed duplicate |
| `orderedListCounter;` (no increment) | `orderedListCounter++` |
| `listType = true` in ordered list close | `listType = null` |
| `"applicatio/pdf"` typo in Content-Type | `"application/pdf"` |
| `"COntent-Type"` header in DOCX response | `"Content-Type"` |
| `"Content-Dispositon"` header | `"Content-Disposition"` |
| Filename regex `/^[a-zA-Z0-9]/g` (only matched first char) | `/[^a-zA-Z0-9]/g` |

---

### 4. Logout never redirected (`frontend/src/context/AuthContext.jsx`)

**Problem:** `Navigate` was imported from `react-router` and called as a regular function. `Navigate` is a **React component**, not a function — calling it does nothing. Users who clicked logout stayed on the current page with their session cleared but no redirect.

```js
// Before (broken)
import { Navigate } from "react-router";
const logout = () => {
  localStorage.removeItem("token");
  Navigate("/");  // ← does nothing, Navigate is a component
};

// After (fixed)
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  setIsAuthenticated(false);
  window.location.href = "/";  // ← actually redirects
};
```

Also removed the unused `Children` import.

---

### 5. Error response comparison was an assignment (`frontend/src/utils/axiosInstance.js`)

**Problem:** `=` (assignment) was used instead of `===` (comparison). This meant the condition was always truthy, so every failed request triggered the "Server error" message regardless of the actual status code.

```js
// Before (broken) — assigns 500 to status, always truthy
if ((error.response.status = 500)) { ... }

// After (fixed)
if (error.response.status === 500) { ... }
```

Also added automatic redirect to `/login` on 401 Unauthorized responses.

---

### 6. Import path double-slash + debug class in `frontend/src/App.jsx`

- `./pages//DashboardPage` → `./pages/DashboardPage`
- Root `<div className="text-green-900 text-3xl">` (leftover debug styles) → `<div>`

---

### 7. Typos in `frontend/src/utils/helper.js`

- `"vaid email address"` → `"valid email address"`
- `"atleast 6 characters"` → `"at least 6 characters"`

---

## Security Fixes

### 1. Mass-assignment vulnerability (`backend/controller/bookController.js`)

**Problem:** `req.body` was passed directly to `findOneAndUpdate`. An attacker could send `{ "userId": "<another-user-id>" }` in the request body to steal another user's book.

```js
// Before (vulnerable)
await Book.findOneAndUpdate({ _id: req.params.id }, req.body, { ... });

// After (fixed) — only allowed fields are extracted
const { title, author, subtitle, chapters, status } = req.body;
const allowedUpdates = {};
if (title !== undefined) allowedUpdates.title = title;
// ... etc
await Book.findOneAndUpdate({ _id: req.params.id }, allowedUpdates, { ... });
```

---

### 2. Error messages leaked internal details (`backend/controller/authController.js`)

`error.message` was included in 500 responses, which can expose stack traces, file paths, and library names to attackers. All 500 responses now return a generic `"Server error"` message. Logs are kept server-side only.

---

### 3. Open CORS — accepted requests from any origin (`backend/server.js`)

```js
// Before (dangerous — any website could call your API)
app.use(cors());

// After — only listed origins allowed
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) callback(null, true);
    else callback(new Error("Not allowed by CORS"));
  },
}));
```

Set allowed origins via the `ALLOWED_ORIGINS` environment variable (comma-separated).

---

### 4. No rate limiting — API open to abuse

Without rate limiting, anyone could brute-force passwords, spam AI generation (incurring API costs), or flood the server. Three limiters were added:

| Limiter | Route | Limit |
|---------|-------|-------|
| Auth | `POST /api/auth/login`, `/register` | 10 requests / 15 min |
| AI | `POST /api/ai/*` | 20 requests / hour |
| General | All routes | 100 requests / 15 min |

---

### 5. No security headers

Added `helmet` which sets HTTP security headers including:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security`
- `X-XSS-Protection`
- Content Security Policy

---

### 6. No request body size limit — DoS via large payloads

Without a limit, an attacker could send enormous JSON bodies to exhaust server memory. Added a `2mb` cap:

```js
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
```

---

### 7. Password hash fetched on every authenticated request (`backend/middlewares/authMiddleware.js`)

The middleware was calling `.select("+password")` on every protected route, loading the bcrypt hash into memory unnecessarily. No controller ever used `req.user.password`. Removed the selector.

---

### 8. Axios had 13 high-severity CVEs (`frontend`)

Axios `1.15.0` was vulnerable to prototype pollution, SSRF, header injection, CRLF injection, and more. Updated to the patched version via `npm audit fix`.

---

### 9. `protobufjs` had a critical RCE vulnerability (`backend`)

A transitive dependency (`protobufjs < 7.5.5`) had an arbitrary code execution vulnerability. Fixed via `npm audit fix`.

---

### 10. User uploads were not gitignored (`backend/.gitignore`)

The `uploads/` directory was not ignored, meaning user-uploaded cover images would be committed to git. Updated `.gitignore` to exclude all files in `uploads/` while keeping the directory tracked via `uploads/.gitkeep`.

---

## Production Readiness

### Environment-based API URL (`frontend/src/utils/apiPaths.js`)

The backend URL was hardcoded to `http://localhost:8000` — the app could never be deployed as-is. It now reads from a Vite environment variable:

```js
// Before
export const BASE_URL = "http://localhost:8000";

// After
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
```

Set `VITE_API_BASE_URL=https://your-api.com` in `frontend/.env.local` for production.

---

### `.env.example` files

Added example environment files so any developer knows exactly what variables are required:

**`backend/.env.example`**
```
PORT=8000
MONGO_URL=mongodb://localhost:27017/ebook
SECRETKEY=change-this-to-a-long-random-secret-at-least-32-chars
GEMINI_API_KEY=your-google-gemini-api-key-here
ALLOWED_ORIGINS=http://localhost:5173,https://your-production-domain.com
```

**`frontend/.env.example`**
```
VITE_API_BASE_URL=http://localhost:8000
```

---

### Health check endpoint

Added `GET /health` which returns `{ status: "ok", timestamp: "..." }`. Use this with uptime monitors (UptimeRobot, Railway, Render, etc.) to detect downtime.

---

### Global error handler and 404 handler

Unhandled errors no longer crash the server silently. A proper Express error handler catches them and returns structured JSON. Unknown routes return `404` instead of hanging.

---

### `npm run dev` script fixed (`backend/package.json`)

The dev script was named `test` (which is a reserved npm script name with special behaviour). Renamed to `dev`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## Deployment Guide

### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)
- Google Gemini API key

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your real values
npm install
npm start          # production
npm run dev        # development (auto-reload)
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
# Set VITE_API_BASE_URL to your backend URL
npm install
npm run build      # production build → dist/
npm run dev        # development server
```

### Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URL` | Yes | MongoDB connection string |
| `SECRETKEY` | Yes | JWT signing secret — use a long random string |
| `GEMINI_API_KEY` | Yes | Google Gemini API key for AI generation |
| `PORT` | No | Server port (default: `8000`) |
| `ALLOWED_ORIGINS` | Yes (prod) | Comma-separated list of allowed frontend URLs |
| `VITE_API_BASE_URL` | Yes (prod) | Backend API URL for the frontend |

### Security Checklist Before Going Live

- [ ] `SECRETKEY` is a long random string (32+ characters), not a dictionary word
- [ ] `ALLOWED_ORIGINS` is set to your exact production frontend domain
- [ ] `MONGO_URL` uses a dedicated database user with minimal permissions
- [ ] HTTPS is configured on your hosting platform
- [ ] `GEMINI_API_KEY` is restricted to your server's IP in Google Cloud Console
