# SIGRU architecture

The code is organized as an academic full-stack monorepo:

- **apps/api:** Node.js / Express API; feature modules `breakfast`, `lunch` and `dinner`.
- **apps/web:** the original Create React App interface, retained as-is with its current client-side structure.
- **docs/requirements:** original academic requirements PDF.
- **.github/workflows:** Node.js backend CI.

## API composition

`src/app.js` loads Mongoose models, mounts `src/routes/index.js` and exports the Express app without opening a port. The route aggregator mounts three independent feature routers. Each module's controller still calls the original Mongoose model.

`src/server.js` connects to MongoDB through `src/config/database.js` before opening the listener. The existing `MONGODB_URI` and `PORT` environment variables remain supported. HTTP endpoint paths stay unchanged.

## Migration notes

- Legacy `sigru-back/` moved into `apps/api/`.
- Legacy `sigru-front/` moved into `apps/web/`, without refactoring UI behavior.
- Models and controllers grouped into `src/modules/<feature>/`; routes separated per module.
- Former route-registration test replaced with a test of real Express module registration.
- HTTP tests moved to `tests/integration/` and updated for relative app import.
- Existing dependency lockfiles and PDF file bytes are retained.

The original Git history remains accessible. No broad dependency-version upgrade was made as part of this structural migration.

## Future checks

Run backend CI and verify the React build before further UI refactoring. Database-backed integration tests and legacy dependency modernization should be tackled independently.
