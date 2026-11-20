# SIGRU · Academic full-stack project

**React · Express · MongoDB · JavaScript**

An academic software-development project, reorganized into a small full-stack monorepo. The code is educational and not a production service.

## Repository layout

```text
apps/
  api/
    src/
      config/database.js
      modules/
        breakfast/
        lunch/
        dinner/
      routes/index.js
      app.js
      server.js
    tests/
      unit/
      integration/
    package.json
    package-lock.json
  web/
    public/
    src/
    package.json
    package-lock.json
docs/
  requirements/
  architecture/
.github/workflows/
README.md
```

Each API module contains its own **controller, model and routes**, grouped by domain. The Express app is separate from database startup for testing.

## Start locally

A running MongoDB instance is required for the real API. Dependencies originate from an older academic project and may emit deprecation warnings.

```bash
cd apps/api
npm ci
npm run dev
```

The API defaults to `http://localhost:3001` and MongoDB at `mongodb://localhost:27017/sigru`. Override with `PORT` and `MONGODB_URI`.

In another terminal:

```bash
cd apps/web
npm ci
npm start
```

The React app defaults to port 3000 and connects to `http://localhost:3001/`. Override the API URL with `REACT_APP_API_URL`.

## Tests

```bash
cd apps/api
npm ci
npm test
```

GitHub Actions runs the back-end test suite on Node.js 20 and 22. Tests cover route registration and HTTP handling with mocked model methods; **no database-backed end-to-end test is claimed**. The React build and manual UI behaviors still require separate validation.

## Architecture and origins

- [Architecture and migration notes](docs/architecture/README.md)
- [Original software requirements](<docs/requirements/Especificações de Requisitos de Software.pdf>)
- [Web app](apps/web)
- [API](apps/api)

This repo preserves an original university assignment and documents its later engineering refactor. No confidential employer materials are included.

---

Pedro Jr. · [GitHub profile](https://github.com/pedroccufc)
