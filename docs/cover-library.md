# Banco de capas da Cyber Coffee

20 capas específicas para as pautas fornecidas: 8 da temporada 1 (2026) e 12 da temporada 2 (2027). Com as 3 capas atuais, o projeto tem 23 conceitos de capa.

- Catálogo: content/cover-library.json
- Arquivos: public/assets/writing/library/
- Galeria local: docs/cover-library.html (abra no navegador; não é uma rota publicada).
- Prompts: docs/cover-library-prompts.md
- Seleção: app/lib/cover-library.js

Cada registro tem id estável, temporada, edição, número original da pauta, título, data planejada, pilar, tags, descrição alternativa e caminhos das duas versões WebP. As capas são interpretações dos títulos; conferir a aderência ao texto final durante a importação. As pautas de SIEM e IA além de prompt injection ainda não estavam escritas quando os temas foram enviados.

## Uso na futura importação

1. Detectar a edição real no feed. Nunca publicar só porque chegou a data planejada.
2. Encontrar a capa pelo coverId explícito ou título exato normalizado. O número da pauta sozinho não é único entre temporadas.
3. Se o título mudar, analisar o texto e escolher um id existente do catálogo, ou adicionar um alias revisado. A função retorna null quando não há correspondência exata; não atribui uma capa com base apenas na data ou em palavras genéricas.
4. Copiar image, cardImage e imageAlt para o artigo publicado. Preservar o vínculo com a URL do LinkedIn para futuras sincronizações.

Exemplo: resolvePlannedCover({ coverId: 'bola' }) retorna os campos prontos para o componente Artwork atual.

As imagens estão prontas. O workflow RSS → tradução → deploy ainda precisa ser implementado e ativado; este catálogo não executa chamadas de IA, não agenda publicação e não adiciona artigos futuros à listagem.
