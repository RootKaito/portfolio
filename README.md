# Portfolio — Lucas Rocha

Site Next.js com edições em inglês do Cyber Coffee em `/writing` e laboratórios públicos em `/labs`.

Os laboratórios publicados são definidos em `app/lib/labs.js`, compartilhados pela homepage e pelo catálogo. Adicione somente projetos já publicados, sem dados corporativos ou proprietários.

## Desenvolvimento

```sh
npm ci
npm run dev
```

Validação: `npm test` e `npm run build`.

## Newsletter

A tradução automática, seleção de capas existentes e publicação são executadas pelo GitHub Actions. Consulte [a documentação do fluxo](docs/newsletter-automation.md) para configuração, limites e recuperação de falhas.

As edições revisadas manualmente estão em `app/lib/english-articles.js`; as automáticas, em `content/generated-articles.json`. A Vercel publica a branch `main`.
