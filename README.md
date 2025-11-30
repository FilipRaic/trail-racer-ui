# TrailRacer UI (Angular)

TrailRacer UI is an Angular application that provides the frontend for the TrailRacer platform. It integrates with two backend services via an Angular dev-server proxy:

- command-service (write/API): http://localhost:8080 (proxied via `/api/...`)
- query-service (read/API): http://localhost:8081 (proxied via `/api-get/...` → rewritten to `/api/...` on the read server)

---

## 🌟 Features

- Role-based UI and routing (ADMIN/APPLICANT)
- Races: list for all users; create/edit/delete for ADMIN
- Applications: list/delete for ADMIN; application form for APPLICANT
- HTTP interceptor adds `Accept: application/json` and `Authorization` automatically
- Proxy split for read vs write requests

---

## 🚀 Technologies

- Angular 19
- RxJS
- Bootstrap 5
- Jest for unit tests

---

## ⚙️ Prerequisites

Install the following:

- Node.js 20+ and npm
- Make (optional but convenient; available via Git for Windows or Homebrew/apt)
- Running backend services on your machine:
  - command-service on http://localhost:8080
  - query-service on http://localhost:8081

---

## 🧱 Project layout

- src/app: Angular application sources (standalone components)
- proxy.conf.js: dev-server proxy to split read/write API calls
- Makefile: convenience commands to develop and build

---

## 🛠️ Install

Using Make (recommended):

```bash
make install
```

Or directly with npm:

```bash
npm ci
```

---

## 🐙 Dev server with proxy

Start the Angular dev server (uses `proxy.conf.js`):

```bash
make start
# or
npm run start
```

Open http://localhost:4200/ in your browser.

Proxy behavior during development:
- GET requests go to `http://localhost:8081` via `/api-get/**` and are rewritten to `/api/**` on the target
- Non-GET requests (POST/PUT/PATCH/DELETE) go to `http://localhost:8080` via `/api/**`

Ensure both backend services are running so the UI can fetch and mutate data.

---

## 📦 Build

Production build:

```bash
a) make build
# or
b) npm run build
```

Artifacts are emitted to `dist/`.

---

## ✅ Tests

Run unit tests (Jest):

```bash
make test
# or
npm run test
```

CI-friendly run with coverage:

```bash
make test-ci
```

---

## 🌐 i18n

Translations live under `src/assets/i18n`. To extract i18n messages (if configured):

```bash
make i18n
```

---

## 🧹 Useful Make targets

- `make install` – install dependencies
- `make start` – start dev server with proxy
- `make build` – production build
- `make test` – run unit tests
- `make test-ci` – run tests with coverage for CI
- `make lint` – run linter (if configured)
- `make format` – format sources with Prettier
- `make clean` – remove `dist/`
- `make analyze` – print Angular/Node versions

---

## 🔧 Troubleshooting

- Seeing 404s for GET endpoints? Restart `ng serve` after any `proxy.conf.js` changes. Confirm the backend read service is on 8081 and that the request path starts with `/api-get/`.
- Getting redirected away from Application pages? Ensure your test user has the correct role (ADMIN for list, APPLICANT for form). The guards enforce access based on JWT.
- CORS errors shouldn’t appear during development because the Angular dev proxy forwards requests server-side.

---

## 📜 Scripts (package.json)

- `npm start` – `ng serve --proxy-config proxy.conf.js`
- `npm run build` – `ng build`
- `npm test` – run Jest tests

---

## 📄 License

Private project, all rights reserved.
