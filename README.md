# Lucas Rocha — Portfolio

Portfólio com conteúdo baseado no currículo e em publicações/projetos públicos fornecidos pelo usuário. Visual escuro com roxo, foto original e layout responsivo. Implementado em Next.js (App Router), transferido pixel a pixel a partir da versão estática original.

## Executar

```sh
npm install
npm run dev
```

Abra http://localhost:3000.

Para build de produção:

```sh
npm run build
npm start
```

## Estrutura

- `app/layout.js`: metadados (title, description, OG, theme-color, favicon).
- `app/page.js`: Server Component async que busca as últimas edições da newsletter (`getNewsletterArticles`) e renderiza `HomeClient`.
- `app/HomeClient.js`: componente cliente que injeta o markup original e porta a lógica de interação (busca Ctrl/Cmd K, menu mobile, filtros, destaque de navegação) via `useEffect`. A seção "Writing" é a única parte do HTML original que virou JSX de verdade (não HTML bruto), para poder renderizar os artigos dinâmicos.
- `app/bodyChunkA.js`, `app/bodyChunkB.js`, `app/bodyFooter.js`, `app/bodyDialogs.js`: HTML original (extraído sem alterações do `dist/index.html`) usado via `dangerouslySetInnerHTML`, dividido nesses pedaços só para abrir espaço para a seção Writing dinâmica sem quebrar o aninhamento de tags.
- `app/lib/newsletter.js`: busca as 3 edições mais recentes da newsletter "Cyber Coffee" via RSS e monta os cards. Ver seção abaixo.
- `app/globals.css`: CSS original (`dist/styles.css`), com apenas o caminho da fonte ajustado para `/assets/...`.
- `public/assets/`: todos os assets originais (imagens, ícones, fontes, CV em PDF).
- `dist/`: versão estática original, mantida como referência/rollback.
- `CONTENT-SOURCES.md`: fontes e limites das afirmações profissionais.
- `ASSETS.md`: origem das imagens e fontes.

## Atualização automática da newsletter (Cyber Coffee)

A seção "Writing" busca sozinha as 3 edições mais recentes da newsletter do LinkedIn — não precisa editar código para publicar uma edição nova.

- **Fonte:** o LinkedIn não tem RSS oficial. O feed vem de `https://linkedinrss.cns.me/7498925114399395842` (serviço de terceiros, baseado no projeto open-source [chrisns/linkedin-newsletter-rss](https://github.com/chrisns/linkedin-newsletter-rss)), que faz scraping público da newsletter "Cyber Coffee" e expõe como RSS.
- **Cadência:** a página é estática (SSG) e revalida a cada 1 hora (`next: { revalidate: 3600 }` em `app/lib/newsletter.js`) — uma edição nova aparece no site em até 1h após ser publicada no LinkedIn, sem precisar de novo deploy.
- **O que vem automático:** título, link, data e um resumo (gerado a partir do corpo do artigo).
- **O que NÃO vem do feed (limitação do RSS):** imagem de capa (alterna automaticamente entre `assets/laptop-dark.png` e `assets/violet-mountains.png`) e tags (ficam vazias/ocultas nos cards novos). Isso foi uma escolha deliberada — automação total em troca de cards um pouco menos "curados" que os 3 originais.
- **Se o feed cair:** `getNewsletterArticles()` tem fallback automático para as 3 edições originais fixas no código (mesmas do site estático), então o site nunca quebra — só para de receber atualizações automáticas até o serviço voltar.
- **Risco conhecido:** por depender de um serviço de terceiros não-oficial, ele pode sair do ar ou mudar de formato sem aviso. Se isso acontecer, o site continua funcionando normalmente com o fallback estático.

## Conteúdo

Três Portões é o laboratório em destaque. O outro laboratório é Posto de Observação. Open Source tem uma seção própria, com contribuição ao Nuclei, status, data, detalhes expansíveis e links para PR e repositório; acessível pelo hero, pela busca e pelo menu mobile. Cyber Coffee exibe as edições mais recentes buscadas automaticamente via RSS (ver seção acima), com fallback para datas e artigos verificados manualmente. A timeline reproduz datas do currículo e expande experiências anteriores. E-mail, LinkedIn e GitHub são os contatos fornecidos.

Não há modais simulando artigos, projetos ou currículo. Links abrem os materiais reais. Não houve publicação. Por solicitação explícita posterior do usuário, o download entrega exatamente o PDF original enviado, sem edição ou remoção de conteúdo. Os textos das páginas continuam com as descrições públicas já revisadas.

## Validação

Inspeção desktop/mobile em 1440, 1280, 1024, 768, 390 e 320 px e zoom 200%. Sem imagens quebradas, rolagem horizontal ou erros JavaScript. Conferidos busca, estado vazio, atalho, menu/Escape, filtros, expansão da timeline, âncoras e download do PDF. PDF de download conferido byte a byte com o original enviado.

## Rollback original

O estado exato anterior ao redesign permanece em `../checkpoints/portfolio-before-dark-20261005.tar.gz`, com manifesto SHA-256 de 29 arquivos. `../checkpoints/rollback.py` verifica sem alterar o site; `--restore` restaura somente quando solicitado e preserva a versão substituída. Esse checkpoint não foi substituído pelas alterações de conteúdo.
