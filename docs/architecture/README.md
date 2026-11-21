# Arquitetura do SIGRU

O SIGRU é um monorepositório acadêmico com duas aplicações JavaScript independentes.

## Componentes

- **`apps/api`** — API HTTP com Express 4, Mongoose 8 e MongoDB. Os módulos de café da manhã, almoço e jantar têm modelos, controladores e roteadores próprios.
- **`apps/web`** — aplicação React 16, empacotada com Vite 7, que consulta a API com Axios. Os componentes de exibição do cardápio são organizados por refeição.
- **`docs/requirements`** — documento de requisitos original da disciplina.
- **`.github/workflows`** — validações automatizadas de backend e front-end, incluindo testes e auditorias de dependências.

## Fluxo de execução

```text
Navegador (React/Vite)
        |
        | HTTP + Axios
        v
Express (apps/api/src/app.js)
        |
        +-- /breakfast --> breakfast routes/controller/model
        +-- /lunch ----> lunch routes/controller/model
        +-- /dinner ---> dinner routes/controller/model
                              |
                              v
                         MongoDB
```

`apps/api/src/app.js` cria o Express app sem abrir porta, facilitando os testes HTTP. `src/server.js` conecta ao MongoDB antes de iniciar a escuta na porta configurada.

As rotas públicas existentes foram mantidas. A paginação usa `mongoose-paginate-v2` e preserva o contrato `docs`, `total`, `pages` utilizado pelas telas.

O middleware `validate-meal-payload.js` valida corpos de POST e PUT para bloquear campos com operadores do MongoDB e valores não textuais. Isso reduz o risco de operadores maliciosos em escritas, **mas não substitui autenticação ou autorização**.

## Evolução do projeto

1. A estrutura legada `sigru-back` e `sigru-front` foi reorganizada em `apps/api` e `apps/web`, preservando o histórico do repositório.
2. O [PR #8](https://github.com/pedroccufc/software-development-web/pull/8) atualizou Mongoose, Express e Nodemon, ajustou a compatibilidade de paginação, acrescentou validação de payloads e testes com MongoDB 7. A CI também passou a verificar dependências de produção e desenvolvimento.
3. O [PR #9](https://github.com/pedroccufc/software-development-web/pull/9) substituiu o Create React App/Webpack 4 por Vite, atualizou o Axios, removeu dependências não utilizadas e acrescentou teste de navegação real em Chromium com dados simulados. A composição recursiva de componentes foi corrigida.

## Testes e limites de validação

- `apps/api/tests/unit`: verificações unitárias de rotas e validação de entradas.
- `apps/api/tests/integration`: testes das operações HTTP com dependências simuladas.
- `apps/api/tests/database`: exercícios contra MongoDB real isolado, com testes de CRUD e paginação.
- `apps/web/tests/browser`: fluxo de entrada demonstrativa, renderização das refeições e paginação no Chromium, com API de fixtures local.

Os pipelines usam `npm ci` e `npm audit`. Um resultado aprovado não substitui testes de implantação, inspeção manual ou avaliação de ameaças. O teste de navegador não acessa o backend real.

## Observações de segurança

**A aplicação não deve ser implantada publicamente como serviço autenticado.** A tela de entrada não valida credenciais, os endpoints de escrita da API não têm autorização e o CORS está permissivo. Essas escolhas foram preservadas por se tratar de um projeto final acadêmico e estão documentadas no [README principal](../../README.md).

Para evoluir para um produto real, seria necessário definir requisitos e implementar autenticação no servidor, autorização por operação, gestão de dados, proteção de rede e testes de integração de ponta a ponta.
