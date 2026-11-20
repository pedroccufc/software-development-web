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

**Mudança de configuração:** a antiga variável `REACT_APP_API_URL`
deve ser substituída por `VITE_API_URL`. Nunca coloque secrets
nessa variável: ela é incorporada ao JavaScript do navegador.

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

O projeto ainda depende de uma API externa e não possui uma suíte
de testes automatizados de interface. O build em CI não substitui
testes de navegação e comportamento no navegador.
