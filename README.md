<div align="center">

# SIGRU · Web Software Development

**University coursework · React front-end · Express API · MongoDB**

An academic web application organized into independent front-end and back-end components.

</div>

---

## Repository structure

```text
software-development-web/
├── sigru-front/          # React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
├── sigru-back/           # Node.js / Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes.js
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   └── Especificações de Requisitos de Software.pdf
├── .gitignore
└── README.md
```

## Local setup (historical project)

This repository contains older dependencies. Check compatibility with your Node.js and MongoDB versions before attempting to run it. The following commands reflect the project's existing scripts; **they have not been validated in a running environment**.

### 1. Back-end

Start a local MongoDB instance on `localhost:27017`. The existing `server.js` connects to `mongodb://localhost:27017/sigru` and serves requests on port **3001**.

```bash
cd sigru-back
npm ci
npm run dev
```

### 2. Front-end

In a separate terminal:

```bash
cd sigru-front
npm ci
npm start
```

The front-end uses Create React App and defaults to port **3000**. Its API client is configured for `http://localhost:3001/` in `sigru-front/src/services/api.js`.

## Source organization

| Area | Location |
| :--- | :--- |
| React application entry and routes | [sigru-front/src](sigru-front/src) |
| React pages | [sigru-front/src/pages](sigru-front/src/pages) |
| API client | [sigru-front/src/services/api.js](sigru-front/src/services/api.js) |
| Express bootstrap | [sigru-back/server.js](sigru-back/server.js) |
| API routes | [sigru-back/src/routes.js](sigru-back/src/routes.js) |
| Controllers | [sigru-back/src/controllers](sigru-back/src/controllers) |
| MongoDB models | [sigru-back/src/models](sigru-back/src/models) |
| Assignment requirements | [Requirements PDF](<sigru-back/Especificações de Requisitos de Software.pdf>) |

## Maintenance notes

- `node_modules` was removed from Git tracking and is excluded by `.gitignore`. Dependencies are restored locally via each component's `package-lock.json`.
- The repository remains an **academic snapshot**, not a production deployment.
- The current API routes include duplicate `GET /breakfast` declarations; endpoint behavior should be reviewed before further development.
- Dependency updates and tests should be carried out in a separate, verified modernization effort rather than silently changing the original coursework.

## Attribution

This project is presented as university coursework. No production use, deployment, or independent authorship of all included frameworks and dependencies is claimed.

---

<div align="center">

**Pedro Jr. · pedrojr.ds**

[GitHub profile](https://github.com/pedroccufc)

</div>
