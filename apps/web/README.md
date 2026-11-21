# SIGRU — Front-end

Interface React para consultar o cardápio de café da manhã, almoço e jantar do SIGRU.

## Requisitos

- Node.js 22 (versão LTS atual suportada pelo Vite 7)
- npm
- API do SIGRU disponível para consultas

## Desenvolvimento

```bash
npm ci
npm run dev
```

O Vite inicia um servidor de desenvolvimento. A API é acessada em
`http://localhost:3001/` por padrão. Configure `VITE_API_URL` em
`.env.local` para usar outro endereço:

```dotenv
VITE_API_URL=http://localhost:3001/
```

**Compatibilidade:** `REACT_APP_API_URL` continua aceito para evitar
quebrar implantações existentes, mas `VITE_API_URL` é o nome recomendado.
Nunca coloque secrets nessas variáveis: o endereço é incorporado ao
JavaScript do navegador.

## Build e auditoria

```bash
npm run build
npm audit --audit-level=high
```

O build estático é produzido em `build/`, mantendo o diretório
de saída usado anteriormente pelo Create React App.

## Notas de migração

A ferramenta de build foi migrada de `react-scripts` (Webpack 4) para
Vite, preservando a estrutura dos componentes e a versão do React nesta
etapa. O arquivo `vite.config.mjs` dá suporte temporário aos
componentes legados com JSX em arquivos `.js`, evitando renomeações
não relacionadas à correção de segurança.

## Escopo acadêmico e limitações

Este software foi desenvolvido exclusivamente como **projeto final da disciplina
de Desenvolvimento de Software para Web**; não é um serviço de produção.

A tela de entrada é **demonstrativa**: o botão "Entrar" apenas altera o estado
da interface. Matrícula e senha não são validadas por servidor, não há sessão,
controle de acesso ou autenticação real. **Não utilize essa tela para proteger
dados ou ações restritas.** Não informe credenciais verdadeiras no formulário.

O GitHub Actions executa build, auditoria npm e um teste de navegação em
Chromium usando dados de refeições de uma API **simulada e isolada**.
Esse teste exercita a entrada demonstrativa, as três seções do cardápio e
a paginação, mas não comprova a integração com uma API real nem valida
autenticação. Para uma utilização além de demonstração acadêmica, seriam
necessários testes de ponta a ponta com o backend e uma implementação
apropriada de autenticação e autorização.
