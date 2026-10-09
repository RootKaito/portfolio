> O fluxo automático está documentado em [Newsletter automática](docs/newsletter-automation.md). As instruções abaixo também permitem manutenção editorial manual.

# Cyber Coffee English editions

`/writing` lists published translations. `/writing/[slug]` renders the complete article. The home page and search link to those internal routes. Portuguese originals and newsletter subscriptions remain on LinkedIn.

The first three editions are English translations of the full Portuguese texts retrieved from https://linkedinrss.cns.me/7498925114399395842 on 2026-10-06. The English text is stored in `app/lib/english-articles.js`; no sample text from the mockup is used. Article paragraphs are rendered as React text, never as untrusted feed HTML.

## Publishing another edition

1. Retrieve the original full article from the newsletter feed and retain its LinkedIn URL and publication date.
2. Translate and review the full text, including headings and lists.
3. Add an entry to `editions` in `app/lib/english-articles.js`, newest first, with a unique stable slug. Match the existing structure (`introduction`, `sections`, optional `list` and `after`).
4. Run `npm run build` and inspect the listing, article and source link.
5. Deploy through the project's usual workflow.

Only saved translations are published. New LinkedIn editions are imported by the GitHub Actions workflow and saved in `content/generated-articles.json`. The legacy RSS helper is not used on the home page. Reading time is calculated at 220 words per minute. The home page shows the latest three English editions.
