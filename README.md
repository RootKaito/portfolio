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
- `app/page.js`: componente cliente que injeta o markup original e porta a lógica de interação (busca Ctrl/Cmd K, menu mobile, filtros, destaque de navegação) via `useEffect`.
- `app/bodyHtml.js`: HTML original (extraído sem alterações do `dist/index.html`) usado via `dangerouslySetInnerHTML` para garantir fidelidade total.
- `app/globals.css`: CSS original (`dist/styles.css`), com apenas o caminho da fonte ajustado para `/assets/...`.
- `public/assets/`: todos os assets originais (imagens, ícones, fontes, CV em PDF).
- `dist/`: versão estática original, mantida como referência/rollback.
- `CONTENT-SOURCES.md`: fontes e limites das afirmações profissionais.
- `ASSETS.md`: origem das imagens e fontes.

## Conteúdo

Três Portões é o laboratório em destaque. O outro laboratório é Posto de Observação. Open Source tem uma seção própria, com contribuição ao Nuclei, status, data, detalhes expansíveis e links para PR e repositório; acessível pelo hero, pela busca e pelo menu mobile. Cyber Coffee exibe artigos reais, datas verificadas e assinatura no LinkedIn. A timeline reproduz datas do currículo e expande experiências anteriores. E-mail, LinkedIn e GitHub são os contatos fornecidos.

Não há modais simulando artigos, projetos ou currículo. Links abrem os materiais reais. Não houve publicação. Por solicitação explícita posterior do usuário, o download entrega exatamente o PDF original enviado, sem edição ou remoção de conteúdo. Os textos das páginas continuam com as descrições públicas já revisadas.

## Validação

Inspeção desktop/mobile em 1440, 1280, 1024, 768, 390 e 320 px e zoom 200%. Sem imagens quebradas, rolagem horizontal ou erros JavaScript. Conferidos busca, estado vazio, atalho, menu/Escape, filtros, expansão da timeline, âncoras e download do PDF. PDF de download conferido byte a byte com o original enviado.

## Rollback original

O estado exato anterior ao redesign permanece em `../checkpoints/portfolio-before-dark-20261005.tar.gz`, com manifesto SHA-256 de 29 arquivos. `../checkpoints/rollback.py` verifica sem alterar o site; `--restore` restaura somente quando solicitado e preserva a versão substituída. Esse checkpoint não foi substituído pelas alterações de conteúdo.
