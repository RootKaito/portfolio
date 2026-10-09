# Portfolio — Lucas Rocha

Site Next.js com edições em inglês do Cyber Coffee em `/writing`.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Validação: `npm test` e `npm run build`.

## Newsletter

A tradução automática, seleção de capas existentes e publicação são executadas pelo GitHub Actions. Consulte [a documentação do fluxo](docs/newsletter-automation.md) para configuração, limites e recuperação de falhas.

As edições revisadas manualmente estão em `app/lib/english-articles.js`; as automáticas, em `content/generated-articles.json`. A Vercel publica a branch `main`.
