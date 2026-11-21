# SIGRU — Sistema de Informações do Restaurante Universitário

**Projeto acadêmico da disciplina de Desenvolvimento de Software para Web.** Aplicação de demonstração para consultar cardápios de café da manhã, almoço e jantar. **Não é um serviço de produção.**

**Stack:** JavaScript, React 16, Vite 7, Axios, Node.js, Express 4, Mongoose 8 e MongoDB.

## Estrutura

```text
apps/
  api/
    src/
      config/database.js
      middleware/validate-meal-payload.js
      modules/{breakfast,lunch,dinner}/
      routes/index.js
      app.js
      server.js
    tests/{unit,integration,database}/
    package.json
  web/
    public/
    src/
    tests/browser/smoke.cjs
    vite.config.mjs
    package.json
docs/
  architecture/README.md
  requirements/
.github/workflows/
  sigru-backend.yml
  sigru-frontend.yml
```

A API e o front-end possuem `package.json` e `package-lock.json` separados; execute o npm no diretório da aplicação correspondente.

## Requisitos para desenvolvimento

- Node.js **22** e npm.
- MongoDB acessível localmente, se for utilizar a API real. Os testes de integração do CI usam **MongoDB 7**.
- Duas sessões de terminal para executar a API e a interface.

## Executar localmente

**1. Inicie um MongoDB local** (padrão: `mongodb://localhost:27017/sigru`).

**2. Inicie a API:**

```bash
cd apps/api
npm ci
npm run dev
```

A API escuta na porta **3001**. Opcionalmente, configure as variáveis de ambiente `PORT` e `MONGODB_URI`.

**3. Em outro terminal, inicie a interface:**

```bash
cd apps/web
npm ci
npm run dev
```

Use o endereço exibido pelo Vite no terminal (porta padrão **5173**). A interface procura a API em `http://localhost:3001/`, a menos que `VITE_API_URL` esteja configurada. O nome antigo `REACT_APP_API_URL` continua aceito para compatibilidade; prefira `VITE_API_URL` nos novos ambientes.

Por exemplo, no arquivo `apps/web/.env.local` (não versionado):

```dotenv
VITE_API_URL=http://localhost:3001/
```

Variáveis `VITE_*` e o endereço da API são incluídos no código entregue ao navegador: **não armazene credenciais nelas**.

## Rotas da API

Os recursos `/breakfast`, `/lunch` e `/dinner` possuem operações `GET /recurso` (lista paginada), `GET /recurso/:id`, `POST /recurso`, `PUT /recurso/:id` e `DELETE /recurso/:id`.

A paginação aceita o parâmetro `page` e mantém as propriedades `docs`, `total` e `pages` esperadas pelo front-end. Os corpos das requisições POST e PUT são validados para rejeitar operadores do MongoDB e valores não textuais.

**Atenção:** esses endpoints de criação, atualização e exclusão **não possuem autenticação nem autorização**. Não exponha a API publicamente com dados reais sem implementar esses controles.

## Testes e auditoria

**Backend:**

```bash
cd apps/api
npm ci
npm test
npm audit --audit-level=high
```

Para testes com banco de dados, configure um MongoDB de testes **isolado**, no endereço local `mongodb://127.0.0.1:27017/sigru_test`, e execute:

```bash
npm run test:db
```

O teste usa a base `sigru_test` e pode apagar dados nela durante a execução. **Nunca aponte os testes para uma base com informações importantes.**

**Front-end:**

```bash
cd apps/web
npm ci
npm run build
npm audit --audit-level=high
```

O build é gerado em `apps/web/build/`. O GitHub Actions executa automaticamente:

- **Backend:** testes unitários, HTTP com mocks e integração com MongoDB 7 em Node.js 20 e 22, além de auditoria npm de produção e da árvore completa.
- **Front-end:** build no Node.js 22, auditoria npm e teste de interface em Chromium com **API simulada localmente**, cobrindo tela de entrada, cardápios e paginação.

A aprovação dessas verificações não garante ausência de vulnerabilidades na aplicação ou integração funcional com uma implantação real. Consulte [os workflows](.github/workflows/) e o [README do front-end](apps/web/README.md).

## Escopo e limitações de segurança

Este repositório é um **trabalho acadêmico/demonstrativo**.

- A tela de “login” apenas altera o estado da interface. **Não valida matrícula ou senha, não cria sessão e não implementa autenticação.** Não informe credenciais reais.
- A API aceita escritas sem autenticação ou autorização; o uso deve ficar restrito a ambientes locais de demonstração ou de testes.
- O CORS da API está permissivo. CORS não é uma forma de autenticação nem de autorização.
- Os testes automatizados do navegador utilizam respostas simuladas; a integração com a API real em ambiente implantado não foi validada por esses testes.
- O projeto ainda utiliza React 16 e React Router 5 para preservar a aplicação acadêmica original. Eventuais atualizações maiores devem ser feitas separadamente, com testes de regressão.

Para utilizar o sistema fora desse contexto acadêmico, implemente autenticação/autorização no servidor, configure exposição de rede e CORS, faça testes de integração com o ambiente de destino e revise o modelo de dados e os controles de segurança.

## Documentação

- [Arquitetura e histórico de migrações](docs/architecture/README.md)
- [Requisitos acadêmicos originais (PDF)](<docs/requirements/Especificações de Requisitos de Software.pdf>)
- [Instruções do front-end](apps/web/README.md)
- [Código do backend](apps/api)

O histórico do Git preserva as versões anteriores deste trabalho.
