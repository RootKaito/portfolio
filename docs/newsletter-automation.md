# Newsletter automática

O workflow `.github/workflows/newsletter.yml` consulta o feed público do Cyber Coffee nos minutos 17 e 47 de cada hora (UTC) e pode ser iniciado manualmente em GitHub Actions → Publish newsletter → Run workflow. O agendamento do GitHub pode atrasar ou perder execuções. Alterações nos scripts do fluxo na main também disparam uma consulta; `repository_dispatch` com o tipo `newsletter-sync` permite um disparador externo autenticado.

Há também uma verificação independente neste chat do Codex, nos minutos 07 e 37: compara o feed com as traduções da main e aciona `workflow_dispatch` quando encontra pendências sem execução ativa. Ela informa falhas e confirma novas publicações. Essa proteção depende de o Codex estar disponível; não é um serviço externo com garantia de horário. A tradução continua executando no GitHub, com a chave armazenada em Actions.

1. Consulta `https://linkedinrss.cns.me/7498925114399395842` e arquiva os textos em `content/newsletter-sources.json`.
2. Ignora URLs já publicadas, inclusive as três traduções revisadas em `app/lib/english-articles.js`.
3. Traduz até três artigos pendentes por execução usando Gemini. A única credencial necessária é o secret de Actions `GEMINI_API_KEY`; ela nunca vai para o navegador.
4. Escolhe uma capa existente pelo assunto e registra `coverId` e `coverReason`. Não gera imagens nem usa serviço pago de imagens. Os catálogos são `content/cover-library.json` e `content/existing-covers.json`.
5. Valida blocos de tradução, metadados e capa, executa o build e faz commit apenas dos dois arquivos de conteúdo. A integração Git da Vercel publica os commits de `main`.

O modelo padrão é `gemini-3.8-flash`. A variável de Actions `GEMINI_MODEL` permite alterar o modelo. A disponibilidade e a cota gratuita dependem do projeto no Google AI Studio; a rotina não ativa faturamento. Respostas 429 e 5xx recebem até duas novas tentativas. Se a indisponibilidade persistir (incluindo 404 do modelo e timeout), consulta os modelos disponíveis para a chave e tenta até duas alternativas Flash de texto, excluindo modelos de imagem, áudio e previews. `GEMINI_FALLBACK_MODELS` (lista separada por vírgulas) permite priorizar alternativas que estejam disponíveis. O modelo utilizado fica registrado no artigo e no relatório. Falhas de autenticação ou validação editorial não acionam essa alternativa. Cada execução produz um resumo no GitHub Actions e um artefato `newsletter-sync-report`, mantido por 14 dias, com artigos pendentes, traduzidos e erros. Falhas aparecem no workflow e os artigos arquivados continuam pendentes para a próxima execução. Traduções válidas podem ser publicadas mesmo que outro artigo falhe.

A validação estrutural não substitui revisão editorial: confira traduções de termos e alegações técnicas. Alterações no original após a primeira tradução são arquivadas, mas não sobrescrevem automaticamente uma edição publicada. Para retraduzir uma edição automática, remova sua entrada de `content/generated-articles.json` e execute novamente. As traduções manuais permanecem protegidas.

O feed é fornecido por um serviço de terceiros e atualmente retorna apenas cinco edições recentes. A automação só descobre artigos que esse feed disponibiliza; o arquivo local evita perder os já recebidos. Datas planejadas no catálogo de capas não publicam artigos. Um texto abaixo de 500 caracteres é recusado para reduzir o risco de publicar apenas uma chamada, mas não é possível garantir que o provedor nunca trunque um texto maior.

Verificação local: `npm ci`, `npm test`, `npm run build`. Sincronização manual: `GEMINI_API_KEY=... npm run newsletter:sync` (prefira injetar a variável sem gravá-la no histórico). Para verificar sem disponibilizar a chave localmente, execute o workflow no GitHub.
